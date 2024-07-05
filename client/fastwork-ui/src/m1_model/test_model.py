import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from gpt_neo_model import GPTNeoModel

# Initialize GPT-Neo model
gpt_neo_model = GPTNeoModel()

# Example of incomplete sentences as input data
about_me = "Data scientist, 5 years experience"
skills = "Python, ML, data viz"
education = "MSc Data Science, XYZ University"
experience = "Data Scientist, ABC Corp, 3 years"

# Pre-process the input data to form complete sentences
about_me_processed = f"I am a {about_me}."
skills_processed = (
    f"1. Proficient in {skills.split(', ')[0]} for data analysis and machine learning applications.\n"
    f"2. Experienced in {skills.split(', ')[1]} for developing and deploying machine learning models.\n"
    f"3. Skilled in {skills.split(', ')[2]} using tools like Pandas, NumPy, and Matplotlib."
)
education_processed = f"Completed {education}."
experience_processed = (
    f"Worked as a {experience.split(', ')[0]} at {experience.split(', ')[1]} for {experience.split(', ')[2]}. "
    "Led data-driven projects to optimize business processes and improve customer experiences. "
    "Collaborated with cross-functional teams to develop predictive models and actionable insights from data. "
    "Successfully implemented machine learning solutions that increased operational efficiency by 20%."
)

# Structured and explicit prompt with stop signal
resume_prompt = (
    "About Me:\n"
    f"{about_me_processed}\n\n"
    "Skills:\n"
    f"{skills_processed}\n\n"
    "Education:\n"
    f"{education_processed}\n\n"
    "Experience:\n"
    f"{experience_processed}\n\n"
    "<END>"
)

# Generate resume content
generated_resume = gpt_neo_model.generate_resume_content(resume_prompt, max_length=500, temperature=0.3, top_p=0.8, num_beams=5)
print("Generated Resume Content:")
print(generated_resume)
