import os

pages = ['nos-cours.html', 'credit-impot.html', 'donner-cours.html', 'about.html']

for page in pages:
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()

        # Communs : update links, buttons, footer
        content = content.replace('backgroundColor: #FDD835', 'background-color: var(--bg-main)')
        content = content.replace('style="background-color: #FDD835;"', '')
        
        # update body to be clean
        content = content.replace('<body style="background-color: #FDD835;">', '<body>')
        
        # apply global footer
        if '<footer>' in content:
            new_footer = """<footer>
    <div class="footer-content">
        <p>© 2023 PÉPITES FRANCE</p>
        <p><a href="mailto:pepitesfrance@gmail.com">📧 pepitesfrance@gmail.com</a></p>
        <p><a href="tel:+33617965027">📞 06 17 96 50 27</a></p>
    </div>
</footer>"""
            import re
            content = re.sub(r'<footer>.*?</footer>', new_footer, content, flags=re.DOTALL)
            
        with open(page, 'w', encoding='utf-8') as f:
            f.write(content)
            
print("Common updates applied to auxiliary pages.")
