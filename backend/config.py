import tweepy

# Configurar las credenciales de autenticación
consumer_key = "8gSy09UPaSHsnmxRJ0TRMSMQt"
consumer_secret = "1PM0JUCa3giTdc6CLA54paxVwPiYoel0wlMTmrNEqUuVQnSXdU"
access_token = "1033419327675015169-ySmHmz6kq8deGHSTBQG2gGYotJ18Dr"
access_token_secret = "K8ens4U9VTGBOLUdHj6yl8BgXDg63L64QfNU1aL5QKH30"

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