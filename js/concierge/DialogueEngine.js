/**
 * JE. DIGITAL UNIVERSE — DIALOGUE ENGINE
 * Handles typewriter text delivery, speech bubble updates,
 * 3D character state synchronization, and chat drawer messages.
 */

class DialogueEngine {
  constructor(options = {}) {
    this.router = options.router || new IntentRouter();
    this.stage = options.stage || null;
    this.voiceManager = options.voiceManager || null;
    this.typewriterInterval = null;
    this.isTyping = false;
    this.activeCharacter = 'gemini';

    // DOM Elements
    this.stageBubbleEl = options.stageBubbleEl || null;
    this.stageSpeakerEl = options.stageSpeakerEl || null;
    this.stageTextEl = options.stageTextEl || null;
    this.stageActionsEl = options.stageActionsEl || null;
    this.drawerMessagesEl = options.drawerMessagesEl || null;
    this.drawerChipsEl = options.drawerChipsEl || null;
  }

  setStage(stage) {
    this.stage = stage;
  }

  setActiveCharacter(charKey) {
    this.activeCharacter = charKey;
    if (this.stage) {
      if (charKey === 'council') {
        this.stage.showCouncilMode();
      } else {
        this.stage.showCharacter(charKey);
      }
    }
  }

  /**
   * Speak a dialogue payload: updates stage speech bubble, drawer chat, and 3D character
   */
  speak(payload, options = {}) {
    if (!payload || !payload.text) return;

    const charKey = payload.character || this.activeCharacter;
    const charMeta = window.JhonKnowledgeBase.characters[charKey] || window.JhonKnowledgeBase.characters.gemini;

    // 1. Update 3D Character State
    if (this.stage) {
      this.stage.triggerSpeaking(charKey, Math.min(payload.text.length * 40, 5000));
    }

    // 2. Play Web Speech Voice (if enabled by user)
    if (this.voiceManager && this.voiceManager.isEnabled) {
      const plainText = payload.text.replace(/[*_#•\n]/g, ' ');
      this.voiceManager.speak(plainText, charKey);
    }

    // 3. Render Stage Speech Bubble
    this.renderStageBubble(charMeta, payload);

    // 4. Render to Drawer Chat (if open or active)
    if (options.addToDrawer !== false) {
      this.addDrawerMessage(charKey, charMeta.name, payload.text);
      this.renderDrawerChips(payload.chips || []);
    }
  }

  renderStageBubble(charMeta, payload) {
    if (!this.stageBubbleEl) return;

    // Update CSS custom property for color accent
    this.stageBubbleEl.style.setProperty('--council-active-color', charMeta.accent);

    if (this.stageSpeakerEl) {
      this.stageSpeakerEl.textContent = charMeta.name;
    }

    // Clear previous typewriter
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
      this.typewriterInterval = null;
    }

    if (this.stageTextEl) {
      // Typewriter delivery
      this.stageTextEl.innerHTML = '';
      const text = payload.text;
      let charIdx = 0;
      this.isTyping = true;

      const cursor = document.createElement('span');
      cursor.className = 'speech-typewriter-cursor';

      this.typewriterInterval = setInterval(() => {
        if (charIdx < text.length) {
          // Format basic markdown bolding on the fly
          const currentSub = text.substring(0, charIdx + 1);
          this.stageTextEl.innerHTML = this.formatMarkdown(currentSub);
          this.stageTextEl.appendChild(cursor);
          charIdx++;
        } else {
          clearInterval(this.typewriterInterval);
          this.typewriterInterval = null;
          this.isTyping = false;
          if (cursor.parentNode) cursor.remove();
        }
      }, 16);
    }

    // Render Action Chips in Bubble
    if (this.stageActionsEl) {
      this.stageActionsEl.innerHTML = '';

      if (payload.actionAnchor && payload.actionLabel) {
        const anchorBtn = document.createElement('a');
        anchorBtn.href = payload.actionAnchor;
        anchorBtn.className = 'speech-chip';
        anchorBtn.textContent = payload.actionLabel;
        this.stageActionsEl.appendChild(anchorBtn);
      }

      if (payload.actionUrl && payload.actionLabel) {
        const urlBtn = document.createElement('a');
        urlBtn.href = payload.actionUrl;
        urlBtn.target = '_blank';
        urlBtn.rel = 'noopener noreferrer';
        urlBtn.className = 'speech-chip';
        urlBtn.textContent = `${payload.actionLabel} ↗`;
        this.stageActionsEl.appendChild(urlBtn);
      }

      const chips = payload.chips || ['Explore Projects', 'Who is Jhon?', 'View Skills & Stack'];
      chips.slice(0, 3).forEach(chipText => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'speech-chip';
        chip.textContent = chipText;
        chip.addEventListener('click', () => {
          this.handleQuery(chipText);
        });
        this.stageActionsEl.appendChild(chip);
      });
    }
  }

  addDrawerMessage(charKey, authorName, text, isUser = false) {
    if (!this.drawerMessagesEl) return;

    const bubble = document.createElement('div');
    bubble.className = `message-bubble ${isUser ? 'user' : 'assistant'}`;

    if (!isUser) {
      const author = document.createElement('span');
      author.className = `message-author ${charKey}`;
      author.textContent = authorName;
      bubble.appendChild(author);
    }

    const content = document.createElement('div');
    content.innerHTML = this.formatMarkdown(text);
    bubble.appendChild(content);

    this.drawerMessagesEl.appendChild(bubble);
    this.drawerMessagesEl.scrollTop = this.drawerMessagesEl.scrollHeight;
  }

  renderDrawerChips(chips) {
    if (!this.drawerChipsEl) return;
    this.drawerChipsEl.innerHTML = '';
    (chips || []).forEach(chipText => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'concierge-chip';
      chip.textContent = chipText;
      chip.addEventListener('click', () => {
        this.handleQuery(chipText);
      });
      this.drawerChipsEl.appendChild(chip);
    });
  }

  handleQuery(queryText) {
    if (!queryText || !queryText.trim()) return;

    // Add user message to drawer
    this.addDrawerMessage('user', 'You', queryText, true);

    // Route intent
    const responsePayload = this.router.route(queryText, this.activeCharacter);

    // If query matches a specific character, update stage
    if (responsePayload.character && responsePayload.character !== this.activeCharacter) {
      this.setActiveCharacter(responsePayload.character);
    }

    // Trigger Guided Planner if requested
    if (responsePayload.openPlanner && window.inquiryBuilder) {
      window.inquiryBuilder.open();
    }

    // Deliver response
    setTimeout(() => {
      this.speak(responsePayload);
    }, 250);
  }

  formatMarkdown(str) {
    if (!str) return '';
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }
}

window.DialogueEngine = DialogueEngine;
