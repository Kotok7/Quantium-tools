import tkinter as tk
from tkinter import messagebox, ttk

root = tk.Tk()
root.title("Quantium tools")
root.geometry("450x300")

progress_value = 0
max_value = 100
progress_step = 1
interval = 50
status_messages = []
final_callback = None

progress_bar = ttk.Progressbar(root, orient='horizontal', length=300, mode='determinate', maximum=max_value)
status_label = tk.Label(root, text="")

def update_progress():
    global progress_value
    progress_value += progress_step
    progress_bar['value'] = progress_value
    segment = max_value // len(status_messages)
    idx = min((progress_value - 1) // segment, len(status_messages) - 1)
    status_label.config(text=status_messages[idx])
    if progress_value < max_value:
        root.after(interval, update_progress)
    else:
        final_callback()
        reset_ui()

def reset_ui():
    global progress_value
    progress_value = 0
    progress_bar.pack_forget()
    status_label.pack_forget()
    for btn in buttons.values():
        btn.config(state=tk.NORMAL)

def start_progress(messages, callback):
    global status_messages, final_callback, progress_value
    status_messages = messages
    final_callback = callback
    progress_value = 0
    for btn in buttons.values():
        btn.config(state=tk.DISABLED)
    progress_bar.pack(pady=10)
    status_label.config(text=status_messages[0])
    status_label.pack(pady=5)
    update_progress()

def show_frame(frame):
    for f in all_frames:
        f.pack_forget()
    frame.pack(pady=20)
    buttons[frame].config(state=tk.NORMAL)

def run_weather():
    loc = entry_location.get().strip()
    if not loc:
        messagebox.showerror("Error", "Please enter your location.")
        return
    messages = [
        "Analyzing clouds...",
        "Enabling quantum computers...",
        "Downloading weather data...",
        "Crunching numbers...",
        "Finalizing report..."
    ]
    def callback():
        messagebox.showinfo("Weather", "Just look outside.")
    start_progress(messages, callback)

def run_age():
    name = entry_name.get().strip()
    try:
        age = int(entry_age.get())
    except ValueError:
        messagebox.showerror("Error", "Please enter a valid age.")
        return
    messages = [
        "Enabling quantum computers...",
        "Analyzing atoms...",
        "Calculating entropy...",
        "Time dilation corrections...",
        "Almost done..."
    ]
    def callback():
        messagebox.showinfo("Result", f"{name}, you are around {age} years old.")
    start_progress(messages, callback)

def run_name():
    name = entry_name_only.get().strip()
    if not name:
        messagebox.showerror("Error", "Please enter a name.")
        return
    messages = [
        "Loading identity module...",
        "Accessing memory banks...",
        "Decrypting name...",
        "Authenticating user...",
        "Almost there..."
    ]
    def callback():
        messagebox.showinfo("Hello", f"Your name is {name}!")
    start_progress(messages, callback)

def run_fake_scan():
    messages = [
        "Initializing scan...",
        "Pinging localhost...",
        "Compiling diagnostics...",
        "Checking server uptime...",
        "Finalizing stats..."
    ]
    def callback():
        messagebox.showinfo(
            "Server Stats",
            "🖥 Server running at 172.0.0.1\nUptime: 17 days\nCPU Usage: 97%\nStatus: All systems nominal!"
        )
    start_progress(messages, callback)

def run_calculator():
    expr = entry_calc.get().strip()
    if not expr:
        messagebox.showerror("Error", "Please enter an expression.")
        return
    messages = [
        "Parsing expression...",
        "Evaluating result...",
        "Generating answer...",
        "Almost there...",
        "Done..."
    ]
    def callback():
        messagebox.showinfo("Calculator", "Just ask ChatGPT")
    start_progress(messages, callback)

weather_frame = tk.Frame(root)
age_frame = tk.Frame(root)
name_frame = tk.Frame(root)
fakescan_frame = tk.Frame(root)
calc_frame = tk.Frame(root)
all_frames = [weather_frame, age_frame, name_frame, fakescan_frame, calc_frame]

label = tk.Label(weather_frame, text="Enter location:")
label.pack()
entry_location = tk.Entry(weather_frame)
entry_location.pack()
btn_weather = tk.Button(weather_frame, text="Check Weather", command=run_weather)
btn_weather.pack(pady=5)

label = tk.Label(age_frame, text="Enter your name:")
label.pack()
entry_name = tk.Entry(age_frame)
entry_name.pack()
label = tk.Label(age_frame, text="Enter your age in years:")
label.pack()
entry_age = tk.Entry(age_frame)
entry_age.pack()
btn_age = tk.Button(age_frame, text="Calculate Age", command=run_age)
btn_age.pack(pady=5)

label = tk.Label(name_frame, text="Enter your name:")
label.pack()
entry_name_only = tk.Entry(name_frame)
entry_name_only.pack()
btn_name = tk.Button(name_frame, text="Check Name", command=run_name)
btn_name.pack(pady=5)

label = tk.Label(fakescan_frame, text="Server Diagnostic Tool")
label.pack(pady=10)
btn_fake = tk.Button(fakescan_frame, text="Check Server Stats", command=run_fake_scan)
btn_fake.pack(pady=10)

label = tk.Label(calc_frame, text="Enter calculation:")
label.pack()
entry_calc = tk.Entry(calc_frame)
entry_calc.pack()
btn_calc = tk.Button(calc_frame, text="Compute", command=run_calculator)
btn_calc.pack(pady=5)

buttons = {
    weather_frame: btn_weather,
    age_frame: btn_age,
    name_frame: btn_name,
    fakescan_frame: btn_fake,
    calc_frame: btn_calc
}

menu = tk.Menu(root)
root.config(menu=menu)
main_menu = tk.Menu(menu, tearoff=0)
menu.add_cascade(label="🎛 Options", menu=main_menu)
main_menu.add_command(label="☁ Check Weather", command=lambda: show_frame(weather_frame))
main_menu.add_command(label="🧮 Calculate Age", command=lambda: show_frame(age_frame))
main_menu.add_command(label="🧑 Check Name", command=lambda: show_frame(name_frame))
main_menu.add_command(label="📟 Server Stats", command=lambda: show_frame(fakescan_frame))
main_menu.add_command(label="🖩 Calculator", command=lambda: show_frame(calc_frame))

root.mainloop()
