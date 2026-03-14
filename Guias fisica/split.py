import os
from PyPDF2 import PdfReader, PdfWriter

def split_pdf():
    input_path = "Guía_1_Movimiento_Oscilatorio_2.pdf"
    taller_path = "Taller_1.pdf"
    guias_path = "Guia_Teoria.pdf"
    
    if not os.path.exists(input_path):
        print(f"File {input_path} not found.")
        return

    reader = PdfReader(input_path)
    taller_writer = PdfWriter()
    guias_writer = PdfWriter()
    
    # Python indices are 0-based.
    # Pages 53 to 57 are index 52 to 56.
    taller_indices = set(range(52, 57))
    total_pages = len(reader.pages)
    
    print(f"Total pages: {total_pages}")
    
    for i in range(total_pages):
        page = reader.pages[i]
        if i in taller_indices:
            taller_writer.add_page(page)
        else:
            guias_writer.add_page(page)
            
    with open(taller_path, "wb") as f_out:
        taller_writer.write(f_out)
        print(f"Created {taller_path}")
        
    with open(guias_path, "wb") as f_out:
        guias_writer.write(f_out)
        print(f"Created {guias_path}")

if __name__ == "__main__":
    split_pdf()
