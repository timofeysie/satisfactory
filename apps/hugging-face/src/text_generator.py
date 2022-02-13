from transformers import pipeline
import sys

prefix_text = sys.argv[1]
text_generation = pipeline("text-generation")
generated_text = text_generation(
    prefix_text, max_length=50, do_sample=False)[0]
print(generated_text['generated_text'])
sys.stdout.flush()
