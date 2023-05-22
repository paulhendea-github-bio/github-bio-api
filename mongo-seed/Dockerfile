FROM mongo

COPY ./fluent-emojis-data.json /tmp/fluent-emojis-data.json
COPY ./skill-icons-data.json /tmp/skill-icons-data.json
CMD mongoimport --uri mongodb://mongodb/github-bio -c emojis --drop --file /tmp/fluent-emojis-data.json --jsonArray && \
    mongoimport --uri mongodb://mongodb/github-bio -c icons --drop --file /tmp/skill-icons-data.json --jsonArray