import React, { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { BsArrowUpSquare } from 'react-icons/bs'

const HomeWork = () => {
    const [todos, setTodos] = useState([]);
    // useEffect(() => {
    //     fetchTodos();
    // }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const handleScroll = (e) => {
            if (e.target.documentElement.scrollTop) {
                setShowScroll(true);
            } else {
                setShowScroll(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    const fetchTodos = () => {
        setIsLoading(true);
        setTimeout(async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await res.json();
            console.log(data);
            setTodos(data);
            setIsLoading(false);
        }, 2000)

    }

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div>
            <button className="button" onClick={fetchTodos}>
                Fetch Data
            </button>
            {isLoading && <RotatingLines width="100" strokeColor="#FF5733" />}
            {todos.map((t, index) => (
                <h4 key={index}>{t.title}</h4>
            ))}
            {showScroll && <span className="up-to-top" onClick={handleScrollToTop}><BsArrowUpSquare fontSize={'32px'} color={"green"} /></span>}

        </div>
    )
}

export default HomeWork