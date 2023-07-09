import tweepy

# Configurar las credenciales de autenticación
consumer_key = "TU_CONSUMER_KEY"
consumer_secret = "TU_CONSUMER_SECRET"
access_token = "TU_ACCESS_TOKEN"
access_token_secret = "TU_ACCESS_TOKEN_SECRET"

# Autenticación con la API de Twitter
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

# Crear una instancia del cliente de la API de Twitter
api = tweepy.API(auth)

# Realizar la solicitud de tendencias
woeid = 23424801  # Código de lugar para Ecuador
trends = api.trends_place(id=woeid)

# Obtener los hashtags de las tendencias
hashtags = [trend['name'] for trend in trends[0]['trends'] if trend['name'].startswith("#")]

# Imprimir los hashtags de tendencia en Ecuador
for hashtag in hashtags:
    print(hashtag)
