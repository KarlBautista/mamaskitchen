.stores-container {
    display: flex;
    flex-direction: row;
    font-family: 'Poppins', sans-serif;
}

.sidebar {
    width: 20%;
    padding: 20px;
    background-color: #f9f9f9;
}

.food-classifications {
    margin-bottom: 20px;
}

.food-class-container {
    margin-bottom: 20px;
}

.store-categories {
    font-size: 1.2rem;
    font-weight: bold;
    color: #FF914D;
    margin-bottom: 10px;
}

.food-class {
    list-style-type: none;
    padding: 0;
}

.food-class li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.food-class li:hover,
.food-class li.active {
    background-color: #FF914D;
    color: white;
}

.main-container {
    width: 80%;
    padding: 20px;
}

.video-platform-container {
    margin-bottom: 20px;
}

.video-platform {
    width: 100%;
    height: auto;
}

.videos {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.food-items {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.food-item {
    width: calc(33.333% - 20px);
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
}

.food-item img {
    width: 100%;
    height: auto;
    border-radius: 10px;
}

.food-item h3 {
    font-size: 1.5rem;
    color: #333;
    margin: 10px 0;
}

.food-item p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
}

.food-item button {
    background-color: #FF914D;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.food-item button:hover {
    background-color: #FB8C00;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 80%;
    max-width: 500px;
}

.modal-content h2 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 10px;
}

.modal-content p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 20px;
}

.modal-content label {
    font-size: 1rem;
    color: #333;
    display: block;
    margin-bottom: 10px;
}

.modal-content input[type="number"] {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.modal-content button {
    background-color: #FF914D;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 5px;
}

.modal-content button:hover {
    background-color: #FB8C00;
}