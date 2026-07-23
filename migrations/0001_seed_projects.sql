INSERT INTO projects VALUES
('edge-document-platform','Edge document platform','A reference architecture for secure document ingestion, storage, and asynchronous processing at the edge.','published','2026-07-20T12:00:00.000Z'),
('pet-match','Pet recommendation app','A playful local-first recommendation experience backed by transparent matching criteria.','published','2026-07-21T12:00:00.000Z'),
('sports-car-finder','Sports car finder','An interactive recommendation slice demonstrating D1 persistence and Cloudflare platform bindings.','published','2026-07-23T12:00:00.000Z');
INSERT INTO architecture_nodes VALUES
('edge-worker','edge-document-platform','Full-stack Worker','Worker','Serves React assets and authenticated APIs.',100,100),
('edge-d1','edge-document-platform','D1','Database','Stores projects and relational metadata.',420,40),
('edge-r2','edge-document-platform','R2','Object storage','Stores document artifacts.',420,180),
('pet-react','pet-match','Pet matcher','React','Scores preferences locally with explainable rules.',100,100),
('pet-worker','pet-match','Project API','Worker','Provides the surrounding architecture-lab project slice.',420,100),
('car-react','sports-car-finder','Recommendation UI','React','Collects criteria and explains ranked recommendations.',80,100),
('car-worker','sports-car-finder','Full-stack Worker','Worker','Enforces identity and serves the car APIs.',350,30),
('car-d1','sports-car-finder','D1 car catalogue','D1','Stores the catalogue and per-identity saved cars.',620,30),
('car-kv','sports-car-finder','KV playground','KV','Demonstrates disposable counters and status.',350,190),
('car-r2','sports-car-finder','R2 artifacts','R2','Demonstrates object creation and queue receipts.',620,190);
