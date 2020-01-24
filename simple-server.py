import http.server
from http.server import HTTPServer
import sys

# 定数
port = 8888 # デフォルトは「 8888 」

# 引数チェック
args = sys.argv
for index, option in enumerate(args):
    if option == '-p': # ポート番号
        port = int(args[index+1]) # ２つ目がないとエラーにする

class ServerHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
      http.server.SimpleHTTPRequestHandler.do_GET(self)

print('Server Starting...')
print('Base URL')
print('[ http://localhost:',port,'/ ]', sep='')

try:
    HTTPServer(("", port), ServerHandler).serve_forever()
except:
    print('  Server Stopped')

