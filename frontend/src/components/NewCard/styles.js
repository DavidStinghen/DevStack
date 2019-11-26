import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 470px;
  height: 620px;
  background: #fff;
  border-radius: 4px;
  border-top: 30px solid rgba(230, 236, 245, 0.4);
  box-shadow: 0 2px 0 3px rgba(192, 208, 230, 0.2);
  margin-top: -50px;
  float: right;

  .btn-cancel {
    background: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
    margin-left: 455px;
    margin-top: 5px;
    padding-top: 3px;
    padding-left: 1px;
    padding-right: 1px;

    &:hover {
      background: #f64c75;
      border: 2px solid #f64c75;
    }

  }

  .btn-share {
    background: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
    margin-left: 455px;
    margin-top: 5px;
    padding-top: 3px;
    padding-right: 3px;

    &:hover {
      background: #3b9eff;
      border: 2px solid #3b9eff;
    }

  }

  header {
    display: flex;
    justify-content: inline;
    align-items: center;
    margin: 0 auto;
    width: 80%;
    border-bottom: 2px solid rgba(230, 236, 245, 0.4);
    margin-top: -70px;

    button {
      margin-top: 20px;
      border: 0;
      background: #fff;
    }

    h1 {
      color: #4f4f4f;
      font-size: 25px;
      font-weight: bold;
      margin-top: 20px;
      margin-left: 10px;
    }
  }

  Form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    border-top: 2px solid # 

    label {
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
      margin-left: 40px;
      color: #4f4f4f;
    }

    p {
      font-size: 14px;
      color: #4f4f4f;
      margin-left: 40px;
      margin-top: 5px;
    }

    input {
      background: rgba(263, 255, 270, 0.4);
      border: 2px solid #ecf1f9;
      border-radius: 5px;
      left: 15px;
      margin-top: 10px;
      margin-left: 40px;
      width: 80%;
      height: 40px;
      color: #4f4f4f;

      &:hover, &:focus {
        box-shadow: 1px 1px rgba(36, 40, 43 , 0.1);
      }
    }

    label#file {
      border: 1px dashed #ddd;
      background-size: cover;
      cursor: pointer;
      height: 50px;
      width: 50px;
    
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    label#file input {
      display: none;
    }
    
    label#file.has-file {
      border: 0;
    }
    
    label#file.has-file GoDiff {
      display: none;
    }

    textarea {
      background: rgba(263, 255, 270, 0.2);
      border: 2px solid #ecf1f9;
      border-radius: 5px;
      left: 15px;
      margin-top: 10px;
      margin-left: 40px;
      width: 80%;
      height: 150px;
      color: #4f4f4f;

      &:hover, &:focus {
        box-shadow: 1px 1px rgba(59, 158, 255, 0.1);
      }
      
    }

    .btn-done {
      background: #3b9eff;
      color: #ecf1f9;
      border: 0;
      height: 60px;
      width: 100%;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      margin-top: 25px;
      border-radius: 0 0 4px 4px;
      
      &:hover {
        background: ${darken(0.05, `#3b9eff`)};
      }
    }

  }
`;

