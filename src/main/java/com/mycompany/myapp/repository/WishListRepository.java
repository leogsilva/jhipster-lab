package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WishList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the WishList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {

    @Query("select wish_list from WishList wish_list where wish_list.user.login = ?#{principal.username}")
    List<WishList> findByUserIsCurrentUser();

}
