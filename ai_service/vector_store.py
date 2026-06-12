DOCUMENTS = []

def store_chunks(chunks):

    global DOCUMENTS

    DOCUMENTS = chunks

def search_chunks(query):

    return DOCUMENTS[:4]