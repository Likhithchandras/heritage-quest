const AIAssistant = {
  isOpen: false,

  open() {
    this.isOpen = true;
    const panel = document.getElementById('aiPanel');
    if (panel) panel.classList.add('open');

    const msgs = document.getElementById('aiMsgs');
    if (msgs && msgs.children.length === 0) {
      this.addMessage('bot', "Ask me anything about the fort, its architecture, the royal seal, or ask for a hint on your current checkpoint.");
    }
  },

  close() {
    this.isOpen = false;
    const panel = document.getElementById('aiPanel');
    if (panel) panel.classList.remove('open');
  },

  addMessage(role, text) {
    const msgs = document.getElementById('aiMsgs');
    if (!msgs) return;
    const el = document.createElement('div');
    el.className = `ai-msg ${role}`;
    el.textContent = text;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  },

  async ask(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();
    this.addMessage('user', cleanText);

    // Show temporary typing status
    const loadingEl = document.createElement('div');
    loadingEl.className = 'ai-msg bot';
    loadingEl.style.opacity = '0.6';
    loadingEl.textContent = 'Consulting historical archives...';
    const msgs = document.getElementById('aiMsgs');
    msgs.appendChild(loadingEl);
    msgs.scrollTop = msgs.scrollHeight;

    const questId = window.AppState ? window.AppState.currentQuestId : null;
    const cpIndex = window.AppState ? window.AppState.currentCheckpoint : 0;

    const res = await API.askAI(cleanText, questId, cpIndex);
    loadingEl.remove();

    if (res && res.success && res.answer) {
      this.addMessage('bot', res.answer);
    } else {
      this.addMessage('bot', "The records of the court do not reveal an answer to that query, but exploring the surroundings may give you clarity.");
    }
  },

  send() {
    const input = document.getElementById('aiInput');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;
    this.ask(val);
    input.value = '';
  }
};
