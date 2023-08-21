# -*- coding: utf-8 -*-
"""
Created on Wed Jul 26 19:10:18 2023
"""

import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageDraw, ImageTk
import random
import math

def generate_abstract_art(width, height, num_shapes):
    image = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(image)

    def random_color():
        return (
            random.randint(0, 255),
            random.randint(0, 255),
            random.randint(0, 255)
        )

    def random_texture_pattern():
        pattern_choices = [
            Image.new('RGBA', (10, 10), color=random_color() + (random.randint(100, 255),)),
            Image.new('RGBA', (10, 10), color=random_color() + (random.randint(100, 255),)),
            Image.new('RGBA', (10, 10), color=random_color() + (random.randint(100, 255),)),
            Image.new('RGBA', (10, 10), color=random_color() + (random.randint(100, 255),)),
        ]
        return random.choice(pattern_choices)

    def draw_star(draw, center_x, center_y, outer_radius, inner_radius, num_points):
        points = []
        for i in range(num_points * 2):
            angle = (math.pi / num_points) * i
            radius = outer_radius if i % 2 == 0 else inner_radius
            x = center_x + radius * math.cos(angle)
            y = center_y + radius * math.sin(angle)
            points.append((x, y))
        draw.polygon(points, fill=random_color())

    for _ in range(num_shapes):
        shape_type = random.choice(['rectangle', 'ellipse', 'polygon', 'line', 'circle', 'star', 'triangle'])
        color = random_color()
        texture = random_texture_pattern()

        if shape_type == 'rectangle':
            x1 = random.randint(0, width)
            y1 = random.randint(0, height)
            x2 = random.randint(x1 + 1, width)
            y2 = random.randint(y1 + 1, height)
            draw.rectangle([x1, y1, x2, y2], fill=color)
            texture = texture.resize((x2 - x1, y2 - y1))
            image.paste(texture, (x1, y1), texture)

        elif shape_type == 'ellipse':
            x1 = random.randint(0, width)
            y1 = random.randint(0, height)
            x2 = random.randint(x1 + 1, width)
            y2 = random.randint(y1 + 1, height)
            draw.ellipse([x1, y1, x2, y2], fill=color)
            texture = texture.resize((x2 - x1, y2 - y1))
            image.paste(texture, (x1, y1), texture)

        elif shape_type == 'polygon':
            num_points = random.randint(3, 6)
            points = [(random.randint(0, width), random.randint(0, height)) for _ in range(num_points)]
            draw.polygon(points, fill=color)

        elif shape_type == 'line':
            x1 = random.randint(0, width)
            y1 = random.randint(0, height)
            x2 = random.randint(0, width)
            y2 = random.randint(0, height)
            draw.line((x1, y1, x2, y2), fill=color, width=random.randint(1, 5))

        elif shape_type == 'circle':
            x1 = random.randint(0, width)
            y1 = random.randint(0, height)
            radius = random.randint(10, 100)
            draw.ellipse([x1 - radius, y1 - radius, x1 + radius, y1 + radius], fill=color)
            texture = texture.resize((2 * radius, 2 * radius))
            image.paste(texture, (x1 - radius, y1 - radius), texture)

        elif shape_type == 'star':
            x = random.randint(0, width)
            y = random.randint(0, height)
            outer_radius = random.randint(20, 80)
            inner_radius = random.randint(10, 50)
            num_points = random.randint(5, 12)
            draw_star(draw, x, y, outer_radius, inner_radius, num_points)

        elif shape_type == 'triangle':
            x1 = random.randint(0, width)
            y1 = random.randint(0, height)
            x2 = random.randint(0, width)
            y2 = random.randint(0, height)
            x3 = random.randint(0, width)
            y3 = random.randint(0, height)
            draw.polygon([(x1, y1), (x2, y2), (x3, y3)], fill=color)

    return image

def on_generate_button():
    global generated_image
    global canvas

    width = int(width_entry.get())
    height = int(height_entry.get())
    num_shapes = int(num_shapes_entry.get())

    generated_image = generate_abstract_art(width, height, num_shapes)
    photo = ImageTk.PhotoImage(generated_image)
    canvas.create_image(0, 0, anchor=tk.NW, image=photo)
    canvas.image = photo

def on_save_button():
    if generated_image:
        file_path = filedialog.asksaveasfilename(defaultextension=".png", filetypes=[("PNG files", "*.png")])
        if file_path:
            generated_image.save(file_path)


root = tk.Tk()
root.title("Abstract Art Generator")
root.configure(bg="black")


canvas = tk.Canvas(root, width=800, height=600, bg="black")
canvas.pack()

tk.Label(root, text="Width:", bg="black", fg="white").pack()
width_entry = tk.Entry(root)
width_entry.insert(tk.END, "800")
width_entry.pack()

tk.Label(root, text="Height:", bg="black", fg="white").pack()
height_entry = tk.Entry(root)
height_entry.insert(tk.END, "600")
height_entry.pack()

tk.Label(root, text="Number of Shapes:", bg="black", fg="white").pack()
num_shapes_entry = tk.Entry(root)
num_shapes_entry.insert(tk.END, "50")
num_shapes_entry.pack()

generate_button = tk.Button(root, text="Generate", command=on_generate_button, bg="black", fg="white")
generate_button.pack()

save_button = tk.Button(root, text="Save", command=on_save_button, bg="black", fg="white")
save_button.pack()

generated_image = None

root.mainloop()
