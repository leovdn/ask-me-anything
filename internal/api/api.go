package api

import (
	"net/http"

	"github.com/leovdn/ask-me-websockets/internal/store/pgstore"

	"github.com/go-chi/chi/v5"
)

type apiHandler struct {
	q *pgstore.Queries
	r *chi.Mux
}

func (h apiHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	h.r.ServeHTTP(w, r)
}

func NewHandler(q *pgstore.Queries) http.Handler {
	a := apiHandler{
		q: q,
	}

	r := chi.NewRouter()
	// r.Get("/api/room/{theme}", a.getRoom)
	// r.Get("/api/rooms", a.getRooms)
	// r.Post("/api/room", a.insertRoom)
	// r.Get("/api/message/{id}", a.getMessage)
	// r.Get("/api/room/{id}/messages", a.getRoomMessages)

	a.r = r
	return a
}
