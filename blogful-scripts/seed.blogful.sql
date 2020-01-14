BEGIN;

INSERT INTO blogful_articles (title,content,date_published)
VALUES
    ('Title 1', 'Content', now() - '1 days'::INTERVAL),
    ('Title 2', 'Content', now() - '2 days'::INTERVAL),
    ('Title 3', 'Content', now() - '2 days'::INTERVAL),
    ('Title 4', 'Content', now() - '3 days'::INTERVAL),
    ('Title 5', 'Content', now() - '21 days'::INTERVAL),
    ('Title 6', 'Content', now() - '26 days'::INTERVAL),
    ('Title 7', 'Content', now() - '29 days'::INTERVAL),
    ('Title 8', 'Content', now() - '60 days'::INTERVAL),
    ('Title 9', 'Content', now() - '4 days'::INTERVAL),
    ('Title 10', 'Content', now() - '4 days'::INTERVAL),
    ('Title 11', 'Content', now() - '3 days'::INTERVAL),
    ('Title 12', 'Content', now() - '21 days'::INTERVAL),
    ('Title 13', 'Content', now() - '21 days'::INTERVAL),
    ('Title 14', 'Content', now() - '21 days'::INTERVAL),
    ('Title 15', 'Content', now() - '21 days'::INTERVAL),
    ('Title 16', 'Content', now() - '21 days'::INTERVAL),
    ('Title 17', 'Content', now() - '21 days'::INTERVAL),
    ('Title 18', 'Content', now() - '21 days'::INTERVAL),
    ('Title 19', 'Content', now() - '21 days'::INTERVAL),
    ('Title 20', 'Content', now() - '21 days'::INTERVAL)
;

COMMIT;