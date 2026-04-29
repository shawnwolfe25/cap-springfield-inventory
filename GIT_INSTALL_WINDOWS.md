# Git Installation Guide - Windows

## Step-by-Step: Install Git on Windows

### Step 1: Download Git

1. **Open your web browser**
2. **Go to:** https://git-scm.com/download/win
3. **The download should start automatically**
   - If not, click the blue download button
   - File will be named something like: `Git-2.xx.x-64-bit.exe`
4. **Wait for download to complete**

### Step 2: Run the Installer

1. **Find the downloaded file**
   - Check your Downloads folder
   - Double-click the `.exe` file
2. **A window will open asking for permission**
   - Click "Yes" to allow installation
3. **The Git Setup Wizard opens**

### Step 3: Follow Installation Steps

**Screen 1: Welcome**
- Click: **"Next"**

**Screen 2: Information**
- Click: **"Next"**

**Screen 3: Choose Location**
- Leave as default (C:\Program Files\Git)
- Click: **"Next"**

**Screen 4: Select Components**
- Leave all options checked (defaults are fine)
- Click: **"Next"**

**Screen 5: Start Menu**
- Leave as default
- Click: **"Next"**

**Screen 6: Choose Default Editor**
- You'll see a dropdown (probably says "Use Vim")
- For beginners, you can leave it or select "Use Notepad"
- Click: **"Next"**

**Screen 7: Configure PATH**
- Select: **"Git from the command line and also from 3rd-party software"** (this is usually the middle option)
- Click: **"Next"**

**Screen 8: HTTPS Transport**
- Select: **"Use the native Windows Secure Channel library"** (the default)
- Click: **"Next"**

**Screen 9: Line Ending Conversions**
- Select: **"Checkout Windows-style, commit Unix-style CRLF"** (the default)
- Click: **"Next"**

**Screen 10: Terminal Emulator**
- Select: **"Use Windows' default console window"** (the default)
- Click: **"Next"**

**Screen 11: Default Behavior**
- Leave all as default
- Click: **"Next"**

**Screen 12: Configure Credentials**
- Leave as default
- Click: **"Next"**

**Screen 13: Experimental Features**
- Don't check anything (unless you want to)
- Click: **"Install"**

**Screen 14: Installation Progress**
- Watch the progress bar
- Installation will take 1-2 minutes

**Screen 15: Completing Setup**
- You should see: **"Git was successfully installed"**
- Uncheck: "View Release Notes" (optional)
- Click: **"Finish"**

### Step 4: Verify Git Installation

1. **Open Command Prompt**
   - Click Start menu
   - Type: `cmd`
   - Click "Command Prompt"

2. **Type this command:**
   ```bash
   git --version
   ```

3. **Press Enter**

4. **You should see something like:**
   ```
   git version 2.40.0.windows.1
   ```

**✅ If you see a version number, Git is installed correctly!**

---

## ✅ Git is Ready!

You can now close Command Prompt and move to the next deployment step.

**Next: Prepare your files and deploy to GitHub**

See the DEPLOYMENT_CHECKLIST.md file for the next steps.

---

## 🆘 Troubleshooting

### "git is not recognized" error

**If you see:** `'git' is not recognized as an internal or external command`

This means Git didn't install properly.

**Try these fixes:**

1. **Restart your computer**
   - Sometimes Windows needs a restart
   - After restart, try `git --version` again

2. **Reinstall Git**
   - Go to Control Panel → Programs → Programs and Features
   - Find "Git"
   - Click Uninstall
   - Download and run the installer again

3. **Check PATH manually**
   - It's in: `C:\Program Files\Git\bin`
   - If you can't find it, reinstall Git

### Installer won't run

**If the .exe won't start:**

1. Right-click the file
2. Select "Run as Administrator"
3. Click "Yes" when prompted

### Need help?

If installation doesn't work:
- Try downloading from: https://git-for-windows.github.io/
- Or download from: https://github.com/git-for-windows/git/releases
- Choose the latest `Git-X.XX.X-64-bit.exe`

---

## ✨ Once Git is Installed

You're ready to:

1. ✅ Organize your files
2. ✅ Upload to GitHub
3. ✅ Deploy to Vercel
4. ✅ Import your data
5. ✅ Share with your squadron

**Follow DEPLOYMENT_CHECKLIST.md for the next steps!**
