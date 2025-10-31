// Get the AI API object (check both window.ai and chrome.ai)
function getAIAPI() {
    if (typeof window !== 'undefined' && 'ai' in window) {
        return window.ai;
    }
    if (typeof chrome !== 'undefined' && 'ai' in chrome) {
        return chrome.ai;
    }
    return null;
}

// Check if Chrome Built-in AI APIs are available
function checkAIAPIAvailability() {
    const aiAPI = getAIAPI();
    
    if (!aiAPI) {
        showSetupInstructions();
        return {
            prompt: false,
            writer: false,
            rewriter: false,
            proofreader: false,
            summarizer: false,
            translator: false,
        };
    }

    const apis = {
        prompt: 'prompt' in aiAPI,
        writer: 'writer' in aiAPI,
        rewriter: 'rewriter' in aiAPI,
        proofreader: 'proofreader' in aiAPI,
        summarizer: 'summarizer' in aiAPI,
        translator: 'translator' in aiAPI,
    };

    const missing = Object.entries(apis)
        .filter(([_, available]) => !available)
        .map(([name]) => name);

    if (missing.length > 0) {
        console.warn('Some AI APIs are not available:', missing);
        console.log('Available APIs:', Object.entries(apis).filter(([_, v]) => v).map(([k]) => k));
    }

    if (missing.length === Object.keys(apis).length) {
        showSetupInstructions();
    }

    return apis;
}

// Show setup instructions modal
function showSetupInstructions() {
    // Remove existing modal if present
    const existing = document.getElementById('setup-modal');
    if (existing) {
        existing.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'setup-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>🔧 Chrome Built-in AI Setup Required</h2>
                <button class="close-btn" onclick="this.closest('#setup-modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <p><strong>The Chrome Built-in AI APIs are not currently available.</strong></p>
                <p>To enable them, follow these steps:</p>
                
                <h3>1. System Requirements</h3>
                <ul>
                    <li><strong>OS:</strong> Windows 10/11, macOS 13+, Linux, or ChromeOS</li>
                    <li><strong>Storage:</strong> At least 22 GB free space</li>
                    <li><strong>RAM:</strong> 16 GB or more</li>
                    <li><strong>GPU:</strong> More than 4 GB VRAM</li>
                    <li><strong>CPU:</strong> At least 4 cores</li>
                </ul>

                <h3>2. Enable Chrome Flags</h3>
                <ol>
                    <li>Open Chrome and navigate to: <code>chrome://flags</code></li>
                    <li>Search for and enable:
                        <ul>
                            <li><code>#writer-api-for-gemini-nano</code></li>
                            <li><code>#prompt-api-for-gemini-nano</code></li>
                            <li><code>#proofreader-api-for-gemini-nano</code></li>
                            <li><code>#summarizer-api-for-gemini-nano</code></li>
                            <li><code>#rewriter-api-for-gemini-nano</code></li>
                            <li><code>#translator-api-for-gemini-nano</code></li>
                        </ul>
                    </li>
                    <li><strong>Restart Chrome</strong> to apply changes</li>
                </ol>

                <h3>3. Join Origin Trial (Optional but Recommended)</h3>
                <p>Register your origin at: <a href="https://developer.chrome.com/docs/ai" target="_blank">Chrome Built-in AI Documentation</a></p>

                <h3>4. Verify Availability</h3>
                <p>Open Chrome DevTools Console and check if <code>window.ai</code> or <code>chrome.ai</code> is available.</p>
                
                <div class="modal-actions">
                    <button class="action-btn" onclick="location.reload()">Reload Page</button>
                    <button class="action-btn secondary" onclick="this.closest('#setup-modal').remove()">Dismiss</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 700px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .modal-header {
            padding: 24px;
            border-bottom: 2px solid #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h2 {
            margin: 0;
            font-size: 1.5rem;
        }
        .close-btn {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            line-height: 1;
            padding: 0;
            width: 32px;
            height: 32px;
        }
        .close-btn:hover {
            color: #000;
        }
        .modal-body {
            padding: 24px;
        }
        .modal-body h3 {
            margin-top: 24px;
            margin-bottom: 12px;
            font-size: 1.2rem;
        }
        .modal-body ul, .modal-body ol {
            margin-left: 20px;
            margin-bottom: 16px;
        }
        .modal-body li {
            margin-bottom: 8px;
            line-height: 1.6;
        }
        .modal-body code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.9rem;
        }
        .modal-actions {
            margin-top: 24px;
            display: flex;
            gap: 12px;
        }
        .action-btn.secondary {
            background: #e0e0e0;
            color: #333;
        }
        .action-btn.secondary:hover {
            background: #d0d0d0;
        }
    `;
    
    if (!document.getElementById('modal-styles')) {
        style.id = 'modal-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
}

// Make function globally accessible for onclick handler
window.showSetupInstructions = showSetupInstructions;

// Show notification to user
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#fce8e6' : type === 'warning' ? '#fef7e0' : '#e8f0fe'};
        color: ${type === 'error' ? '#c5221f' : type === 'warning' ? '#ea8600' : '#1967d2'};
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 400px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            tabContents.forEach((content) => content.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Check API availability on load
    checkAIAPIAvailability();
});

// Writer API
document.getElementById('writer-btn')?.addEventListener('click', async () => {
    const prompt = document.getElementById('writer-prompt').value.trim();
    const output = document.getElementById('writer-output');
    const button = document.getElementById('writer-btn');
    const aiAPI = getAIAPI();

    if (!prompt) {
        showNotification('Please enter a prompt to generate content.', 'error');
        return;
    }

    if (!aiAPI || !('writer' in aiAPI)) {
        showNotification('Writer API is not available. Check setup instructions.', 'error');
        showSetupInstructions();
        return;
    }

    button.disabled = true;
    button.innerHTML = '<span class="loading"></span>Generating...';
    output.textContent = '';

    try {
        // Try different possible API structures
        let result;
        if (typeof aiAPI.writer.create === 'function') {
            result = await aiAPI.writer.create(prompt);
        } else if (typeof aiAPI.writer === 'function') {
            result = await aiAPI.writer(prompt);
        } else {
            throw new Error('Writer API structure not recognized');
        }
        
        output.textContent = result?.text || result?.response || result || 'No output received';
        showNotification('✅ Content generated successfully!', 'info');
    } catch (error) {
        console.error('Writer API error:', error);
        console.error('Available API structure:', aiAPI);
        output.textContent = `Error: ${error.message}\n\nCheck the console for more details.`;
        showNotification('❌ Failed to generate content. ' + error.message, 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Generate Content';
    }
});

// Rewriter API
document.getElementById('rewriter-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('rewriter-input').value.trim();
    const output = document.getElementById('rewriter-output');
    const button = document.getElementById('rewriter-btn');
    const aiAPI = getAIAPI();

    if (!input) {
        showNotification('Please enter text to rewrite.', 'error');
        return;
    }

    if (!aiAPI || !('rewriter' in aiAPI)) {
        showNotification('Rewriter API is not available. Check setup instructions.', 'error');
        showSetupInstructions();
        return;
    }

    button.disabled = true;
    button.innerHTML = '<span class="loading"></span>Rewriting...';
    output.textContent = '';

    try {
        let result;
        if (typeof aiAPI.rewriter.create === 'function') {
            result = await aiAPI.rewriter.create(input);
        } else if (typeof aiAPI.rewriter === 'function') {
            result = await aiAPI.rewriter(input);
        } else {
            throw new Error('Rewriter API structure not recognized');
        }
        
        output.textContent = result?.text || result?.response || result || 'No output received';
        showNotification('✅ Content rewritten successfully!', 'info');
    } catch (error) {
        console.error('Rewriter API error:', error);
        output.textContent = `Error: ${error.message}\n\nCheck the console for more details.`;
        showNotification('❌ Failed to rewrite content. ' + error.message, 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Rewrite Content';
    }
});

// Proofreader API
document.getElementById('proofreader-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('proofreader-input').value.trim();
    const output = document.getElementById('proofreader-output');
    const button = document.getElementById('proofreader-btn');
    const aiAPI = getAIAPI();

    if (!input) {
        showNotification('Please enter text to proofread.', 'error');
        return;
    }

    if (!aiAPI || !('proofreader' in aiAPI)) {
        showNotification('Proofreader API is not available. Check setup instructions.', 'error');
        showSetupInstructions();
        return;
    }

    button.disabled = true;
    button.innerHTML = '<span class="loading"></span>Proofreading...';
    output.textContent = '';

    try {
        let result;
        if (typeof aiAPI.proofreader.create === 'function') {
            result = await aiAPI.proofreader.create(input);
        } else if (typeof aiAPI.proofreader === 'function') {
            result = await aiAPI.proofreader(input);
        } else {
            throw new Error('Proofreader API structure not recognized');
        }
        
        output.textContent = result?.text || result?.response || result || 'No output received';
        showNotification('✅ Text proofread successfully!', 'info');
    } catch (error) {
        console.error('Proofreader API error:', error);
        output.textContent = `Error: ${error.message}\n\nCheck the console for more details.`;
        showNotification('❌ Failed to proofread text. ' + error.message, 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Proofread';
    }
});

// Summarizer API
document.getElementById('summarizer-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('summarizer-input').value.trim();
    const output = document.getElementById('summarizer-output');
    const button = document.getElementById('summarizer-btn');
    const aiAPI = getAIAPI();

    if (!input) {
        showNotification('Please enter text to summarize.', 'error');
        return;
    }

    if (!aiAPI || !('summarizer' in aiAPI)) {
        showNotification('Summarizer API is not available. Check setup instructions.', 'error');
        showSetupInstructions();
        return;
    }

    button.disabled = true;
    button.innerHTML = '<span class="loading"></span>Summarizing...';
    output.textContent = '';

    try {
        let result;
        if (typeof aiAPI.summarizer.create === 'function') {
            result = await aiAPI.summarizer.create(input);
        } else if (typeof aiAPI.summarizer === 'function') {
            result = await aiAPI.summarizer(input);
        } else {
            throw new Error('Summarizer API structure not recognized');
        }
        
        output.textContent = result?.text || result?.response || result || 'No output received';
        showNotification('✅ Text summarized successfully!', 'info');
    } catch (error) {
        console.error('Summarizer API error:', error);
        output.textContent = `Error: ${error.message}\n\nCheck the console for more details.`;
        showNotification('❌ Failed to summarize text. ' + error.message, 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Summarize';
    }
});

// Translator API
document.getElementById('translator-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('translator-input').value.trim();
    const targetLang = document.getElementById('target-language').value;
    const output = document.getElementById('translator-output');
    const button = document.getElementById('translator-btn');
    const aiAPI = getAIAPI();

    if (!input) {
        showNotification('Please enter text to translate.', 'error');
        return;
    }

    if (!aiAPI || !('translator' in aiAPI)) {
        showNotification('Translator API is not available. Check setup instructions.', 'error');
        showSetupInstructions();
        return;
    }

    button.disabled = true;
    button.innerHTML = '<span class="loading"></span>Translating...';
    output.textContent = '';

    try {
        let result;
        const options = { targetLanguage: targetLang };
        
        if (typeof aiAPI.translator.create === 'function') {
            result = await aiAPI.translator.create(input, options);
        } else if (typeof aiAPI.translator === 'function') {
            result = await aiAPI.translator(input, options);
        } else {
            throw new Error('Translator API structure not recognized');
        }
        
        output.textContent = result?.text || result?.response || result || 'No output received';
        showNotification('✅ Text translated successfully!', 'info');
    } catch (error) {
        console.error('Translator API error:', error);
        output.textContent = `Error: ${error.message}\n\nCheck the console for more details.`;
        showNotification('❌ Failed to translate text. ' + error.message, 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Translate';
    }
});

// Prompt API
document.getElementById('prompt-btn')?.addEventListener('click', async () => {
    const input = document.getElementById('prompt-input').value.trim();
    const outputType = document.getElementById('prompt-type').value;
    const output = document.getElementById('prompt-output');
    const button = document.getElementById('prompt-btn');
    const aiAPI = getAIAPI();

    if (!input) {
        showNotification('Please enter a prompt.', 'error');
        return;
    }

    if (!aiAPI || !('prompt' in aiAPI)) {
        showNotification('Prompt API is not available. Check setup instructions.', 'error');
        showSetupInstructions();
        return;
    }

    button.disabled = true;
    button.innerHTML = '<span class="loading"></span>Generating...';
    output.textContent = '';

    try {
        const options = outputType === 'structured' 
            ? { outputFormat: 'json' }
            : {};

        let result;
        if (typeof aiAPI.prompt.create === 'function') {
            result = await aiAPI.prompt.create(input, options);
        } else if (typeof aiAPI.prompt === 'function') {
            result = await aiAPI.prompt(input, options);
        } else {
            throw new Error('Prompt API structure not recognized');
        }
        
        if (outputType === 'structured' && typeof result === 'object') {
            output.textContent = JSON.stringify(result, null, 2);
        } else {
            output.textContent = result?.text || result?.response || result || 'No output received';
        }
        
        showNotification('✅ Prompt processed successfully!', 'info');
    } catch (error) {
        console.error('Prompt API error:', error);
        output.textContent = `Error: ${error.message}\n\nCheck the console for more details.`;
        showNotification('❌ Failed to process prompt. ' + error.message, 'error');
    } finally {
        button.disabled = false;
        button.textContent = 'Generate';
    }
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

