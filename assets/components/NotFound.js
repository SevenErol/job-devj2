import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner } from 'flowbite-react';
import { Link } from 'react-router-dom';

const NotFound = props => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>404 Not Found</h1>
        </div>
    )
};

export default NotFound;