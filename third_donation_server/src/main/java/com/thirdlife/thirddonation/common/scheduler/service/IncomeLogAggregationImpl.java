package com.thirdlife.thirddonation.common.scheduler.service;

import com.thirdlife.thirddonation.common.scheduler.dto.LogByDayDto;
import com.thirdlife.thirddonation.db.log.document.IncomeLog;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 로깅 서비스의 구현체입니다.
 */
@Service
@Transactional
@AllArgsConstructor
public class IncomeLogAggregationImpl implements IncomeLogAggregation {

    private MongoTemplate mongoTemplate;

    /**
     * 집계함수로 로깅합니다.
     *
     * @return List of LogByDayDto
     */
    public List<LogByDayDto> aggregateByDay(Long userId) {
        ProjectionOperation dateProjection =
                Aggregation.project().and("userId").previousOperation()
                        .and("tradingDates").as("tradingDates")
                        .and("tokenIds").as("tokenIds")
                        .and("sumIncome").as("sumIncome");

        //현재는 거래로그가 너무 적어서 하루로 하면 너무 적게 찍힘
        LocalDate startDay = LocalDate.parse("2022-03-01");
        LocalDate date = LocalDate.now();

        //날짜로 조회한다는 가정. 당일로 할거면 둘 다 date.atTime하면 당일임!
        Criteria criteria = new Criteria().andOperator(
                Criteria.where("tradingDate").gte(startDay.atTime(0, 0, 0))
                        .lte(date.atTime(23, 59, 59))
        );

        MatchOperation where = Aggregation.match(//조건절 설정
                criteria
        );

        GroupOperation groupBy =
                Aggregation.group("userId")
                        .sum("income").as("sumIncome")
                        .addToSet("tokenId").as("tokenIds")
                        .push("tradingDate").as("tradingDates");

        TypedAggregation<IncomeLog> textAggregation =
                Aggregation.newAggregation(IncomeLog.class,
                        where,
                        groupBy,
                        dateProjection);

        String temp = textAggregation.toString();
        System.out.println(temp);

        AggregationResults<LogByDayDto> results =
                mongoTemplate.aggregate(textAggregation, LogByDayDto.class);

        return results.getMappedResults();
    }

}
