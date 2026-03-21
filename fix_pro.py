import re
with open('css/styles.css', 'r') as f: content = f.read()
content = content.replace('--bg-main: #FAFBFC;', '--bg-main: #F3F6F9;')
content = content.replace('--brand-blue: #0047AB;', '--brand-blue: #0A3A82;')
content = content.replace('--surface-light: #FFFFFF;', '--surface-light: rgba(255, 255, 255, 0.85);')
content += '''
/* PRO MAX OVERRIDES */
nav { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.3); }
.page-hero { background: radial-gradient(circle at 10% 20%, rgba(0, 71, 171, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 193, 7, 0.08) 0%, transparent 40%); padding: 8rem 5% 5rem; }
