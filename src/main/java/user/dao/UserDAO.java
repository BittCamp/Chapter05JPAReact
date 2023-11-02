package user.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import user.bean.UserDTO;

public interface UserDAO extends JpaRepository<UserDTO, String> {

	public List<UserDTO> findByNameContaining(String value);

	public List<UserDTO> findByIdContaining(String value);
	
	//검색 대상이 테이블이 아니라 영속성 컨텍스트에 등록된 엔티티이다.
	// ?1는 첫번째 파라메터를 의미한다.
	/*
	@Query("select userDTO from UserDTO userDTO where userDTO.name like concat('%', ?1, '%')")
	public List<UserDTO> getUserSearchName(String value);
	
	@Query("select userDTO from UserDTO userDTO where userDTO.id like concat('%', ?1, '%')")
	public List<UserDTO> getUserSearchId(String value);
	*/
	
	@Query("select userDTO from UserDTO userDTO where userDTO.name like concat('%', :value, '%')")
	public List<UserDTO> getUserSearchName(@Param("value") String value);
	
	@Query("select userDTO from UserDTO userDTO where userDTO.id like concat('%', :value, '%')")
	public List<UserDTO> getUserSearchId(@Param("value") String value);

}










