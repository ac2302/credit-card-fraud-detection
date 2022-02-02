import pandas as pd
import numpy as np
import os.path
import random
import pickle

with open('model.pkl', 'rb') as f:
    model = pickle.load(f)


def predict_from_vectors(input_vectors):
    predictions = model.predict(input_vectors)
    human_readable_predictions = []

    for p in predictions:
        if p:
            human_readable_predictions.append("fraud")
        else:
            human_readable_predictions.append("not fraud")

    return human_readable_predictions


def predict_from_file(input_path):
    df = pd.read_csv(input_path)

    # getting data from csv
    exclude = ['Class', 'acc name']
    columns = [i for i in df.columns.to_list() if i not in exclude]
    X_pred = np.array(df[columns])

    # making predictions
    y_pred = model.predict(X_pred)

    # X to write to file
    target = 'Class'
    display_columns = [i for i in df.columns.to_list() if i != target]
    X_display = np.array(df[display_columns])

    # writing results to a file
    result_id = random.randint(0, 696969)
    filepath = os.path.join(
        "predicted", f"result{result_id}.csv")
    with open(filepath, "w") as f:
        print(
            ",".join([f'"{heading}"' for heading in (display_columns + ["Fraud"])]), file=f)
        for i in range(len(y_pred)):
            print(",".join(str(x) for x in X_display[i]), end=',', file=f)
            print('"yes"' if y_pred[i] else '"no"', file=f)

    return result_id, filepath
