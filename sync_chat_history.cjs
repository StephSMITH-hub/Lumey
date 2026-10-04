const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = __dirname;
const brainDir = path.join(process.env.USERPROFILE || 'C:\\Users\\Stephycopy', '.gemini', 'antigravity-ide', 'brain');
const logFile = path.join(repoRoot, 'CHAT_AND_SESSION_LOG.md');
const projectsLog = path.join(repoRoot, 'projects', 'CHAT_HISTORY_AND_SESSION_BACKUP.md');

console.log('\x1b[33m=================================================================\x1b[0m');
console.log('\x1b[33m LUMEY CHAT & SESSION PROGRESS SYNC ENGINE \x1b[0m');
console.log(`\x1b[90m Repository: ${repoRoot}\x1b[0m`);
console.log(`\x1b[90m Timestamp:  ${new Date().toISOString().replace('T', ' ').slice(0, 19)}\x1b[0m`);
console.log('\x1b[33m=================================================================\x1b[0m\n');

let latestConv = null;
let transcriptPath = null;

if (fs.existsSync(brainDir)) {
  const folders = fs.readdirSync(brainDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const fullPath = path.join(brainDir, d.name);
      const stat = fs.statSync(fullPath);
      return { name: d.name, path: fullPath, mtime: stat.mtime };
    })
    .sort((a, b) => b.mtime - a.mtime);

  if (folders.length > 0) {
    latestConv = folders[0];
    const candidate = path.join(latestConv.path, '.system_generated', 'logs', 'transcript.jsonl');
    if (fs.existsSync(candidate)) {
      transcriptPath = candidate;
    }
  }
}

const sessionTurns = [];

if (transcriptPath && fs.existsSync(transcriptPath)) {
  console.log(`\x1b[36mActive Conversation ID:\x1b[0m ${latestConv.name}`);
  console.log(`\x1b[90mReading transcript: ${transcriptPath}\x1b[0m\n`);

  const content = fs.readFileSync(transcriptPath, 'utf8');
  const lines = content.split('\n');

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'USER_INPUT') {
        let text = String(obj.content || '');
        const match = text.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
        if (match) text = match[1].trim();
        sessionTurns.push({
          step: obj.step_index,
          role: 'USER',
          timestamp: obj.created_at,
          content: text.trim()
        });
      } else if (obj.type === 'PLANNER_RESPONSE' && obj.content) {
        let text = String(obj.content || '').replace(/\r?\n/g, ' ');
        if (text.length > 250) text = text.slice(0, 250) + '...';
        sessionTurns.push({
          step: obj.step_index,
          role: 'AGENT',
          timestamp: obj.created_at,
          content: text
        });
      }
    } catch (e) {}
  }
} else {
  console.log('\x1b[33m[INFO] No transcript found. Generating manual session snapshot.\x1b[0m\n');
}

// Display recent chat exchanges on console
console.log('\x1b[33m-----------------------------------------------------------------\x1b[0m');
console.log('\x1b[33m RECENT CHAT UPDATES & EXCHANGES IN THIS SESSION \x1b[0m');
console.log('\x1b[33m-----------------------------------------------------------------\x1b[0m');

const recent = sessionTurns.slice(-6);
if (recent.length === 0) {
  console.log('\x1b[90mNo chat messages extracted yet. Capturing workspace activity.\x1b[0m\n');
} else {
  for (const turn of recent) {
    if (turn.role === 'USER') {
      console.log(`\x1b[32m[USER @ ${turn.timestamp || 'Recent'}]\x1b[0m`);
      console.log(`  \x1b[37m${turn.content}\x1b[0m\n`);
    } else {
      console.log(`\x1b[36m[AGENT @ ${turn.timestamp || 'Recent'}]\x1b[0m`);
      console.log(`  \x1b[90m${turn.content}\x1b[0m\n`);
    }
  }
}

// Compile Markdown
const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
let gitBranch = 'main';
let latestCommit = '';
try {
  gitBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim() || 'main';
  latestCommit = execSync('git log -1 --pretty=format:"%h - %s (%ci)"', { encoding: 'utf8' }).trim();
} catch (e) {}

let md = `# Lumey Energy - Session Chat & Progress History Log\n`;
md += `*Last Updated: ${now} | Active Branch: \`${gitBranch}\` | Latest Commit: \`${latestCommit}\`*\n\n`;
md += `---\n\n`;
md += `## 1. Executive Summary & Active Session Metadata\n`;
md += `- **Active Workspace:** \`${repoRoot}\`\n`;
md += `- **Active Conversation ID:** \`${latestConv ? latestConv.name : 'manual-session'}\`\n`;
md += `- **Session Last Activity:** \`${latestConv ? latestConv.mtime.toISOString() : now}\`\n`;
md += `- **GitHub Repository:** \`https://github.com/StephSMITH-hub/Lumey.git\`\n\n`;
md += `---\n\n`;
md += `## 2. Conversation & Chat History Transcript\n`;
md += `The following chronological log records the prompts, queries, and strategic instructions discussed during development:\n\n`;

if (sessionTurns.length > 0) {
  for (const turn of sessionTurns) {
    if (turn.role === 'USER') {
      md += `### [USER REQUEST] (Step ${turn.step} - ${turn.timestamp})\n`;
      md += '```text\n' + turn.content + '\n```\n\n';
    } else {
      md += `> **AGENT SUMMARY & ACTION:**\n`;
      md += `> ${turn.content}\n\n`;
    }
  }
} else {
  md += `*No explicit transcript turns found. Active development underway.*\n\n`;
}

md += `---\n\n`;
md += `## 3. Key Accomplishments & Deliverables Status\n`;
md += `- **Affiliate & Marketing Models:** Completed TypeScript Mongoose models (\`model/affiliate.ts\`, \`model/affiliate_order.ts\`) and Prisma schema updates (\`prisma/schema.prisma\`).\n`;
md += `- **API Endpoints:** Live partner registration (\`/api/affiliates\`) and discount voucher validation (\`/api/affiliates/verify-voucher\`).\n`;
md += `- **Commercial Retail Assets:** 10-slide Executive Pitch Deck (\`Lumey_Executive_Distributor_Pitch_Deck.html\`), Master Distributor Agreement (\`LUMEY_MASTER_DISTRIBUTOR_AGREEMENT_AND_EXCLUSIVITY.md\`), Showroom Roll-Up Banner (\`Lumey_Showroom_Rollup_Banner.html\`), Tri-Fold Brochure (\`Lumey_Consumer_Product_Brochure.html\`), and In-Store Sales Battlecard (\`LUMEY_IN_STORE_SALES_REPRESENTATIVE_FLOOR_CARD.md\`).\n`;
md += `- **Automation Systems:** Meta/TikTok Ad Creative Suite (\`LUMEY_PARTNER_RECRUITMENT_AD_CREATIVE_SUITE.md\`), WhatsApp Chatbot Scripts (\`LUMEY_WHATSAPP_BUSINESS_AUTOMATION_SCRIPTS.md\`), Tuesday Reconciliation Script (\`reconcile_payouts.ps1\`), and GitHub Auto-Sync Engines (\`sync_progress.ps1\`, \`sync_chat_history.ps1\`, \`pull_repo.ps1\`).\n\n`;
md += `---\n`;
md += `*Auto-generated and synced to GitHub via \`sync_chat_history.ps1\`*\n`;

fs.writeFileSync(logFile, md, 'utf8');
console.log(`\x1b[32m[OK] Updated chat log file:\x1b[0m ${logFile}`);

if (fs.existsSync(path.dirname(projectsLog))) {
  fs.writeFileSync(projectsLog, md, 'utf8');
  console.log(`\x1b[32m[OK] Mirrored chat log file:\x1b[0m ${projectsLog}`);
}

console.log('\n\x1b[36mSyncing chat log to GitHub...\x1b[0m');
try {
  execSync(`git add "${logFile}"`, { stdio: 'inherit' });
  if (fs.existsSync(projectsLog)) {
    execSync(`git add "${projectsLog}"`, { stdio: 'inherit' });
  }
  try {
    execSync(`git commit -m "docs: sync session chat history and progress log [${now}]"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('\x1b[90mChat log is already up to date with the latest commit.\x1b[0m');
  }
  execSync(`git push origin ${gitBranch}`, { stdio: 'inherit' });
  console.log('\n\x1b[32m=================================================================\x1b[0m');
  console.log('\x1b[32m [SUCCESS] Chat history & progress log synced directly to GitHub!\x1b[0m');
  console.log('\x1b[32m Log File: CHAT_AND_SESSION_LOG.md\x1b[0m');
  console.log('\x1b[32m=================================================================\x1b[0m');
} catch (err) {
  console.log('\x1b[33m[WARNING] Could not push to GitHub (check internet connection or credentials).\x1b[0m');
}
