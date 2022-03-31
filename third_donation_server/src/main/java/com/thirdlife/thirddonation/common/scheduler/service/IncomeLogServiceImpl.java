package com.thirdlife.thirddonation.common.scheduler.service;

import com.thirdlife.thirddonation.db.log.document.DailyIncome;
import com.thirdlife.thirddonation.db.log.document.IncomeLog;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.AddFieldsOperation;
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
@RequiredArgsConstructor
public class IncomeLogServiceImpl implements IncomeLogService {

    private final MongoTemplate mongoTemplate;

    /**
     * 집계함수로 일별 사용자 수익을 로깅합니다.
     *
     * @return List of LogByDayDto
     */
    public List<DailyIncome> aggregateByDay() {

        ProjectionOperation dateProjection =
                Aggregation.project().and("userId").previousOperation()
                        .and("income").as("income")
                        .and("tradingDate").as("tradingDate");

        LocalDate yesterday = LocalDate.now().minusDays(1);

        //날짜로 조회한다는 가정. 당일로 할거면 둘 다 date.atTime하면 당일임!
        Criteria criteria = new Criteria().andOperator(
                Criteria.where("tradingDate").gte(yesterday.atTime(0, 0, 0))
                        .lte(yesterday.atTime(23, 59, 59))
        );

        //조건절 설정
        MatchOperation where = Aggregation.match(
                criteria
        );

        //공통 칼럼 추가 (거래일)
        AddFieldsOperation addFields =
                Aggregation.addFields().addField("tradingDate").withValueOf(yesterday).build();

        //그룹핑
        GroupOperation groupBy =
                Aggregation.group("userId")
                        .sum("income").as("income")
                        .first("tradingDate").as("tradingDate");

        TypedAggregation<IncomeLog> textAggregation =
                Aggregation.newAggregation(IncomeLog.class,
                        addFields,
                        where,
                        groupBy,
                        dateProjection);

        String temp = textAggregation.toString();
        System.out.println(temp);

        AggregationResults<DailyIncome> results =
                mongoTemplate.aggregate(textAggregation, DailyIncome.class);

        for (DailyIncome dailyIncome : results.getMappedResults()) {
            mongoTemplate.insert(dailyIncome);
        }

        return results.getMappedResults();
    }
}
