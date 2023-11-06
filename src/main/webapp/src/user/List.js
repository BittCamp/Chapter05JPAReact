import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from '../css/List.module.css';
import mainImg from '../image/망상토끼.gif';
import Index from '../main/Index';

const List = () => {
    const{page} = useParams() //클래스의 객체값을 가지고 있음. 얘는 16진수로 된 주소값 가지고 있다. 객체는 주소값가지고 있다.

    const [list, setList] = useState([])
    const [pagingArray,setPagingArray] = useState([])

    
    const [columnName, setcolumnName] = useState('name')
    const [keyword, setkeyword] = useState('')

    useEffect(() => {
        //axios.get('http://localhost:8080/user/getUserList?page=${page}')
        axios.get(`/user/getUserList?page=${page}`)
            .then(res => {
                setList(res.data.content)
                setPagingArray(Array.from({ length: res.data.totalPages },(_,index)=> index+1)) //{}객체
                console.log(res.data)
            })
            .catch(error => console.log(error))
        }, [page])  
        
        const onSearchList = (e) => {
            e.preventDefault()

            axios.get(`/user/getUserSearchList?page=${page}`,{
                params:{
                    columnName: columnName,
                    keyword: keyword 
                }
            })
            .then(res => {
                setList(res.data.content)
                setPagingArray(Array.from({ length: res.data.totalPages },(_,index)=> index+1)) 
                console.log(res.data)
            })
            .catch(error => console.log(error))
        }
    
    return (
        <div>
            <h3>
        		<Link to='/'>
        		    <img src={ mainImg } alt='망상토끼' width='50' height='50' />
        		</Link>
        	</h3>
            <table border='1'>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>비밀번호</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => {
                            return (
                                <tr key={ item.id }>
                                    <td align='center'>{ item.name }</td>
                                    
                                    <td align='center'>
                                        <Link className={ styles.subjectA } to={ `/user/updateForm/${item.id}` }>                                                             
                                            { item.id }
                                        </Link>
                                    </td>
                                    
                                    <td align='center'>{ item.pwd }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot></tfoot>
            </table>
            {/* 페이징 처리 */}
            <p style={{width: '650px' , textAlign: 'center'}}>
                {
                    pagingArray.map(item => <span key={ item }>
                        {/* page는 useParams() 으로 받은 객체라서 parseInt() 사용 객체를 정수형으로 바꿔주면 된다.*/}
                        <Link id={ (item-1) === parseInt(page) ? styles.currentPaging:styles.paging } 
                              to={ `/user/list/${item-1}` }>{ item }</Link>
                        {/* {item } */}
                    </span>)
                }
            </p>

            {/*  검색 */}
            <div style={{width:'650px', textAlign: 'center' , margin: '50px' }}>
                <form id="searchListForm">
                    <select name="columnName" style={{width:'100px' , margin: '5px'}} onChange={e => setcolumnName(e.target.value) }>
                        <option value="name">이름</option>
                        <option value="id">아이디</option>		
                    </select>
                    <input type="text" name='keyword' value={ keyword } onChange={ e => setkeyword(e.target.value) }/> &nbsp;
                    <button onClick={onSearchList}>검색</button>
                </form>
            </div>
        </div>
    );
};

export default List;