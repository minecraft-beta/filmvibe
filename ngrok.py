from pyngrok import ngrok
import os

ngrok.set_auth_token("2brFtV6cyUE8RulqFo4azDVxUKz_2YRVPrug7ufwchpiRToMd")

# Set the port for your server
port = 6969

# Open a tunnel on the desired port
public_url = ngrok.connect(port)
print('Public URL:', public_url)

os.system("node server.mjs")