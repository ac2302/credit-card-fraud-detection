import pandas as pd
import numpy as np
import time
from os import remove, path


def schedule_delete(filename, delay):
    time.sleep(delay)
    print(f"deleting {filename}")
    remove(filename)


def get_frauds(id):
    df = pd.read_csv(path.join("predicted", f"result{id}.csv"))
    gists = np.array(df[["acc name", "Amount", "Fraud"]])

    frauds = []
    for entry in gists:
        if entry[2] == "yes":
            frauds.append({"acc_name": entry[0], "amount": entry[1]})

    return frauds
