import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    width: 100%;
    padding: 96px;
    background-color: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 25px;
    }
`;

export const Section = styled.section`
    width: 100%;
    max-width: 380px;

    h1 {
        margin: 64px 0 32px;
        font-size: 32px;
    }

    p {
        font-size: 18px;
        color: #737380;
        line-height: 32px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

export const Form = styled.form`
    width: 100%;
    max-width: 450px;

    input, textarea {
        margin-top: 8px;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;