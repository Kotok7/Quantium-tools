import tkinter as tk
from tkinter import messagebox
from tkinter import ttk

def update_progress():
    global progress_value, max_value, progress_step, interval
    progress_value += progress_step
    progress_bar['value'] = progress_value
    if progress_value < max_value:
        root.after(interval, update_progress)
    else:
        calculate_seconds()

def calculate_seconds():
    try:
        age = int(entry_age.get())
        seconds = age * 365 * 24 * 3600
        messagebox.showinfo("Result", f"You are approximately {seconds} seconds old.")
    except ValueError:
        messagebox.showerror("Error", "Please enter a valid age (integer).")
    finally:
        btn_calculate.config(state=tk.NORMAL)
        progress_bar.pack_forget()
        status_label.pack_forget()
        reset_progress()

def reset_progress():
    global progress_value
    progress_value = 0

def start_progress():
    try:
        int(entry_age.get())
        btn_calculate.config(state=tk.DISABLED)
        global progress_value, max_value, progress_step, interval
        progress_value = 0
        max_value = 100
        progress_step = 1
        interval = 50
        progress_bar.pack(pady=10)
        status_label.pack(pady=5)
        update_progress()
    except ValueError:
        messagebox.showerror("Error", "Please enter a valid age (integer).")

root = tk.Tk()
root.title("Age Calculator")
root.geometry("300x200")

label = tk.Label(root, text="Enter your age in years:")
label.pack(pady=10)

entry_age = tk.Entry(root)
entry_age.pack(pady=5)

btn_calculate = tk.Button(root, text="Calculate", command=start_progress)
btn_calculate.pack(pady=10)

progress_bar = ttk.Progressbar(root, orient='horizontal', length=250, mode='determinate', maximum=100)
status_label = tk.Label(root, text="Calculating...")

root.mainloop()