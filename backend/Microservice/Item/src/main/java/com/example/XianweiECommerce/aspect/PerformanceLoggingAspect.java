package com.example.XianweiECommerce.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class PerformanceLoggingAspect {

    @Pointcut("execution(* com.example.XianweiECommerce.service.ItemService.searchItems(..))")
    public void searchItemsMethod() {}

    @Around("searchItemsMethod()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long endTime = System.currentTimeMillis();
        long duration = endTime - startTime;

        log.info("{} executed in {} ms", joinPoint.getSignature(), duration);
        return result;
    }
}

