def create_chunks(text, chunk_size=500):

    words = text.split()

    chunks = []
    current_chunk = []

    current_length = 0

    for word in words:

        current_chunk.append(word)
        current_length += len(word)

        if current_length >= chunk_size:

            chunks.append(
                " ".join(current_chunk)
            )

            current_chunk = []
            current_length = 0

    if current_chunk:
        chunks.append(
            " ".join(current_chunk)
        )

    return chunks