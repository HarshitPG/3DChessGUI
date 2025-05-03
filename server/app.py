from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask import request
import chess
import chess.engine

engine = chess.engine.SimpleEngine.popen_uci(r"./engine/stockfish")

app = Flask(__name__, template_folder='../client/public', static_folder='../client/public')
CORS(app) 

# Error handler for general exceptions
@app.errorhandler(Exception)
def handle_exception(error):
    response = jsonify({"error": "Internal Server Error", "message": str(error)})
    response.status_code = 500
    return response

# Error handler for 404 Not Found
@app.errorhandler(404)
def handle_not_found(error):
    response = jsonify({"error": "Not Found", "message": "The requested resource was not found on this server."})
    response.status_code = 404
    return response

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from the Flask API!(Flask Backend is functioning!)"}
    return jsonify(data)

@app.route('/')
def root():
    return render_template("index.html")

@app.route('/make_move', methods=["POST"])
def make_move():
    try:
        print("Received a POST request to /make_move")
        print('request from', request.form)
        fen = request.form.get('fen')
        print('fen:', fen)
        board = chess.Board(fen)
        print(board)
        result = engine.play(board, chess.engine.Limit(time=0.1))
        board.push(result.move)
        print('best_move:', str(result.move))
        fen = board.fen()
        return {'fen': fen, 'best_move': str(result.move)}
    except Exception as e:
        response = jsonify({"error": "Internal Server Error", "message": str(e)})
        response.status_code = 500
        return response

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
