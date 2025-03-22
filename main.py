import tkinter as tk
from tkinter import messagebox
from tkinter import ttk

def start_progress():
    age = entry.get()
    if not age.isdigit():
        messagebox.showerror("Error", "Please enter a valid number.")
        return
    entry.pack_forget()
    label.pack_forget()
    button.pack_forget()
    calc_label.pack(pady=5)
    progress.pack(pady=10)
    progress["value"] = 0
    update_progress(age, 0)

def update_progress(age, current_value):
    if current_value < 100:
        current_value += 100/30
        progress["value"] = current_value
        root.after(100, lambda: update_progress(age, current_value))
    else:
        progress["value"] = 100
        messagebox.showinfo("Result", f"You are {age} years old.")
        root.destroy()

root = tk.Tk()
root.title("Age Calculator")
root.geometry("300x150")

style = ttk.Style()
if "vista" in style.theme_names():
    style.theme_use("vista")
elif "xpnative" in style.theme_names():
    style.theme_use("xpnative")

style.configure("green.Horizontal.TProgressbar", troughcolor="white", background="green")

label = tk.Label(root, text="Enter your age:")
label.pack(pady=10)

entry = tk.Entry(root)
entry.pack(pady=5)

button = tk.Button(root, text="Submit", command=start_progress)
button.pack(pady=10)

calc_label = tk.Label(root, text="Calculating...")
progress = ttk.Progressbar(root, style="green.Horizontal.TProgressbar", orient="horizontal", mode="determinate", maximum=100, length=200)

root.mainloop()