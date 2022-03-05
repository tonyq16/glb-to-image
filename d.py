from unicodedata import name
from playwright.sync_api import sync_playwright
import time
import subprocess
import os
def generate_d_image(file):
    os.rename("./assets/"+file, "./assets/the_holy_file.glb")
    with sync_playwright() as p:
        browser=p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto('http://localhost:8000/index.html')
        time.sleep(2)
        page.query_selector(".webgl").screenshot(path=file+".png")
    os.rename("./assets/the_holy_file.glb", "./assets/"+file)
for file in os.listdir("./assets"):
    if file.endswith(".glb"):
        generate_d_image(file)