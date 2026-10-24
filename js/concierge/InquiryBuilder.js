/**
 * JE. DIGITAL UNIVERSE — GUIDED INQUIRY BUILDER
 * Interactive project scoping wizard that transforms visitor requirements
 * into a structured, pre-populated client inquiry draft.
 */

class InquiryBuilder {
  constructor(options = {}) {
    this.modalEl = options.modalEl || null;
    this.recipientEmail = options.email || "jhonkylhoestrabo@gmail.com";
    this.formData = {
      projectType: "Full-Stack Web Application",
      techPreference: "React / Next.js",
      timeline: "1-2 Months",
      notes: ""
    };

    this.initListeners();
  }

  initListeners() {
    if (!this.modalEl) return;

    // Type options
    const typeButtons = this.modalEl.querySelectorAll('[data-inquiry-type]');
    typeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        typeButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.formData.projectType = btn.getAttribute('data-inquiry-type');
      });
    });

    // Tech options
    const techButtons = this.modalEl.querySelectorAll('[data-inquiry-tech]');
    techButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        techButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.formData.techPreference = btn.getAttribute('data-inquiry-tech');
      });
    });

    // Timeline options
    const timeButtons = this.modalEl.querySelectorAll('[data-inquiry-timeline]');
    timeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        timeButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.formData.timeline = btn.getAttribute('data-inquiry-timeline');
      });
    });

    // Notes textarea
    const notesInput = this.modalEl.querySelector('#planner-notes-input');
    if (notesInput) {
      notesInput.addEventListener('input', (e) => {
        this.formData.notes = e.target.value;
      });
    }

    // Submit button
    const submitBtn = this.modalEl.querySelector('#planner-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        this.generateMailto();
      });
    }

    // Cancel / Close button
    const cancelBtn = this.modalEl.querySelector('#planner-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.close();
      });
    }
  }

  open() {
    if (this.modalEl) {
      this.modalEl.classList.add('open');
      this.modalEl.setAttribute('aria-hidden', 'false');
    }
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove('open');
      this.modalEl.setAttribute('aria-hidden', 'true');
    }
  }

  generateMailto() {
    const subject = encodeURIComponent(`[Project Inquiry] ${this.formData.projectType} — Collaboration with Jhon Kylho Estrabo`);
    const bodyText = 
`Hi Jhon,

I would like to discuss a potential project collaboration:

• Project Category: ${this.formData.projectType}
• Preferred Tech / Stack: ${this.formData.techPreference}
• Desired Timeline: ${this.formData.timeline}

Project Overview & Goals:
${this.formData.notes || "We're looking to build a new system and would love to review architectural recommendations and availability."}

Looking forward to connecting!

Best regards,
`;

    const mailtoUrl = `mailto:${this.recipientEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
    this.close();
  }
}

window.InquiryBuilder = InquiryBuilder;
