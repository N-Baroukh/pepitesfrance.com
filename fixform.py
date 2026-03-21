with open("css/styles.css", "a", encoding="utf-8") as f:
    f.write("""
/* PREMIUM FORM STYLES */
.form-section {
    background: #ffffff;
    padding: 3.5rem 4rem;
    border-radius: 24px;
    max-width: 650px;
    margin: 3rem auto 5rem auto;
    box-shadow: 0 25px 50px -12px rgba(0, 71, 171, 0.15), 0 0px 15px rgba(0,0,0,0.03);
    border: 1px solid rgba(0, 71, 171, 0.05);
    position: relative;
    z-index: 2;
    animation: slideUp 0.8s ease-out;
}

.form-section h2 {
    text-align: center;
    font-size: 2.25rem;
    color: var(--brand-blue-dark);
    margin-bottom: 2.5rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    text-align: left;
}

.form-group label {
    font-weight: 500;
    margin-bottom: 0.6rem;
    color: #4b5563;
    font-size: 0.95rem;
}

.form-group .required {
    color: #ef4444;
    font-weight: bold;
    margin-left: 3px;
}

.form-section input, 
.form-section select, 
.form-section textarea {
    padding: 1rem 1.25rem;
    border-radius: 12px;
    border: 2px solid #e5e7eb;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #f9fafb;
    color: #1f2937;
    width: 100%;
    box-sizing: border-box;
}

.form-section input::placeholder, 
.form-section textarea::placeholder {
    color: #9ca3af;
    font-weight: 400;
}

.form-section input:focus, 
.form-section select:focus, 
.form-section textarea:focus {
    outline: none;
    border-color: var(--brand-blue);
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(0, 71, 171, 0.1);
    transform: translateY(-1px);
}

.form-section textarea {
    min-height: 140px;
    resize: vertical;
    line-height: 1.5;
}

.form-section .submit-btn {
    width: 100%;
    margin-top: 1.5rem;
    padding: 1.15rem;
    font-size: 1.15rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    box-shadow: 0 10px 20px -5px rgba(255, 193, 7, 0.4);
    background: var(--brand-yellow);
    color: var(--brand-blue-dark);
    transition: all 0.3s ease;
}

.form-section .submit-btn:hover {
    box-shadow: 0 15px 25px -5px rgba(255, 193, 7, 0.5);
    transform: translateY(-3px);
    background: var(--brand-yellow-hover);
}

@media (max-width: 768px) {
    .form-section { 
        padding: 2.5rem 1.5rem; 
        border-radius: 20px;
        margin-top: 2rem;
    }
    .form-section h2 {
        font-size: 1.85rem;
    }
}
""")
print("Done appending CSS")
