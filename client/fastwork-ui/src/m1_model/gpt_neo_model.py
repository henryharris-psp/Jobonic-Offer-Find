from transformers import GPTNeoForCausalLM, GPT2Tokenizer

class GPTNeoModel:
    def __init__(self, model_name='EleutherAI/gpt-neo-1.3B'):
        self.tokenizer = GPT2Tokenizer.from_pretrained(model_name)
        self.model = GPTNeoForCausalLM.from_pretrained(model_name)
        self.tokenizer.pad_token = self.tokenizer.eos_token  # Set the pad token to eos token

    def generate_resume_content(self, prompt, max_length=300, temperature=0.3, top_p=0.8, num_beams=5):
        input_ids = self.tokenizer.encode(prompt, return_tensors='pt')
        attention_mask = (input_ids != self.tokenizer.pad_token_id).long()  # Correctly create attention mask as long tensor

        output = self.model.generate(
            input_ids,
            attention_mask=attention_mask,  # Use attention mask
            max_length=max_length,
            temperature=temperature,
            top_p=top_p,
            do_sample=True,  # Enable sampling
            no_repeat_ngram_size=2,
            early_stopping=True,
            num_beams=num_beams,  # Set num_beams for beam search
            pad_token_id=self.tokenizer.eos_token_id  # Set pad token to eos token
        )
        result = self.tokenizer.decode(output[0], skip_special_tokens=True)
        
        # Post-processing to truncate at <END>
        if '<END>' in result:
            result = result.split('<END>')[0].strip()
        
        return result
