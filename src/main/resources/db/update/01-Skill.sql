-- Ensure Name field is unique
ALTER TABLE skill
    ADD CONSTRAINT unique_name
        UNIQUE (name);