package com.gym360.backend.repository;


import org.springframework.stereotype.Repository;

@Repository
public interface DemoRepository<T, ID> {

    T save(T entity);


    void delete(T entity);


    T findById(ID id);


    boolean existsById(ID id);


    Iterable<T> findAll();


    long count();
}