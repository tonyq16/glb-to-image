# glb2image

This is a tool for rendering glb (3D) files, adjusting their dimensions to fit your screen. Note that it requires a graphics library to be installed on the browser, making it unsuitable for execution on platforms like AWS Lambda, where graphics libraries like Mesa or OpenGL implementations are not available.

## How to Run

1. Build the Docker image:
   ```bash
   docker build -t glb2image:latest .
   docker run -p 8000:8000 glb2image


