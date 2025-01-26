import boto3

translate = boto3.client('translate')

response = translate.translate_text(
    Text='Hello, world',
    SourceLanguageCode='en',  # or 'auto' for automatic detection
    TargetLanguageCode='es'
)

translated_text = response['TranslatedText']

print(translated_text)