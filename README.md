# AI Content Studio 

A modern web application built for the **Google Chrome Built-in AI Challenge 2025** that showcases the power of client-side AI processing using Chrome's built-in AI APIs and Gemini Nano.

## Features

AI Content Studio is a comprehensive content creation and editing tool that utilizes multiple Chrome Built-in AI APIs:

- ** Writer API**: Generate original and engaging text from prompts
- ** Rewriter API**: Improve content with alternative phrasing and better structure
- ** Proofreader API**: Correct grammar mistakes and enhance writing clarity
- ** Summarizer API**: Distill complex information into clear, concise insights
- ** Translator API**: Translate text into multiple languages
- ** Prompt API**: Generate dynamic prompts and structured outputs (multimodal support)

##  Privacy & Benefits

All AI processing happens **locally on your device** - your data never leaves your browser! This provides:

-  **Inherent Privacy**: User input and context never leave the device
-  **Network Resilience**: Works offline and on unstable connections
-  **Cost Efficiency**: No server costs or API quotas
-  **Creative Freedom**: Build proactive AI patterns without limitations

##  Getting Started

### Prerequisites

- Google Chrome browser with Built-in AI features enabled
- Access to Chrome Built-in AI Early Preview Program
- Chrome version that supports the Built-in AI APIs

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd ai-content-studio
```

2. Open the project:
   - Simply open `index.html` in Chrome, or
   - Use a local web server (recommended):
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` (or the port you chose)

### Testing Instructions

1. Ensure you're using Chrome with Built-in AI enabled
2. Open the application in your browser
3. Navigate through different tabs to test each API:
   - **Writer**: Enter a topic and generate original content
   - **Rewriter**: Paste text to improve and rewrite
   - **Proofreader**: Paste text with errors to correct
   - **Summarizer**: Paste long text to get a summary
   - **Translator**: Enter text and select target language
   - **Prompt API**: Create prompts with structured or text outputs

4. Each feature should process requests locally without sending data to external servers

### Troubleshooting

#### "API is not available" Error

If you see errors indicating that the Chrome Built-in AI APIs are not available:

1. **Check System Requirements**:
   - Windows 10/11, macOS 13+, Linux, or ChromeOS
   - At least 22 GB free storage
   - 16 GB+ RAM
   - GPU with 4+ GB VRAM
   - CPU with 4+ cores

2. **Enable Chrome Flags**:
   - Navigate to `chrome://flags` in Chrome
   - Search for and enable these flags:
     - `#writer-api-for-gemini-nano`
     - `#prompt-api-for-gemini-nano`
     - `#proofreader-api-for-gemini-nano`
     - `#summarizer-api-for-gemini-nano`
     - `#rewriter-api-for-gemini-nano`
     - `#translator-api-for-gemini-nano`
   - **Restart Chrome** after enabling flags

3. **Join Origin Trial** (Optional):
   - Visit [Chrome Built-in AI Documentation](https://developer.chrome.com/docs/ai)
   - Register your origin for access

4. **Verify in Console**:
   - Open Chrome DevTools (F12)
   - Check if `window.ai` or `chrome.ai` is available
   - Type `window.ai` or `chrome.ai` in the console

5. **Click "Setup Help" Button**:
   - The app includes a setup help button in the header
   - Click it for detailed setup instructions

**Note**: The app automatically shows setup instructions when APIs are not detected. If you need help, click the "⚙️ Setup Help" button in the header.

## 📋 APIs Used

This project demonstrates usage of the following Chrome Built-in AI APIs:

1. **Prompt API** (`window.ai.prompt`)
   - Used for generating dynamic prompts and structured outputs
   - Supports multimodal input (text, image, audio)

2. **Writer API** (`window.ai.writer`)
   - Creates original text content from user prompts

3. **Rewriter API** (`window.ai.rewriter`)
   - Improves existing content with alternative phrasing

4. **Proofreader API** (`window.ai.proofreader`)
   - Corrects grammar and improves writing clarity

5. **Summarizer API** (`window.ai.summarizer`)
   - Creates concise summaries of longer text

6. **Translator API** (`window.ai.translator`)
   - Translates text between multiple languages

##  Problem Statement

Content creation and editing workflows often require:
- Multiple tools and subscriptions for different tasks
- Privacy concerns when sending sensitive content to cloud services
- Internet connectivity for AI-powered features
- High costs for API usage and server infrastructure

**Solution**: AI Content Studio consolidates all content creation and editing needs into a single, privacy-focused, offline-capable web application that runs entirely on the client side using Chrome's Built-in AI capabilities.

##  Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: No dependencies, pure client-side code
- **Chrome Built-in AI APIs**: Integration with Gemini Nano and Chrome AI models

## Browser Compatibility

- Google Chrome (with Built-in AI features enabled)
- Requires Chrome Built-in AI Early Preview Program access

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Contributing

This project was created for the Google Chrome Built-in AI Challenge 2025. Contributions and feedback are welcome!

##  Contact

For questions or feedback about this project, please open an issue in the repository.

---

**Built for Google Chrome Built-in AI Challenge 2025** | Powered by Gemini Nano 🚀

