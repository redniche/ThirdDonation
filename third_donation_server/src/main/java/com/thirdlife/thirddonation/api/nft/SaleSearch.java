package com.thirdlife.thirddonation.api.nft;

import com.thirdlife.thirddonation.db.nft.entity.Sales;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

/**
 * 구매 조회시 Nft 를 필터링하기 위한 Enum 클래스.
 */
public class SaleSearch {
    /**
     * 검색 키.
     */
    public enum SearchKey {
        ARTIST("username"),
        NAME("name"),
        FILE_TYPE("fileType"),
        WISH_COUNT_GREATER("wishCount"),
        PRICE_BETWEEN("basePrice"),
        SELLER_ID("id");

        private final String value;

        SearchKey(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }

    /**
     * 판매 정보를 키워드로 조회.
     *
     * @param searchKeyword Map
     * @return Specification
     */
    public static Specification<Sales> searchWith(Map<SearchKey, Object> searchKeyword) {
        return ((root, query, builder) -> {
            List<Predicate> predicate = getPredicateWithKeyword(searchKeyword, root, builder);
            return builder.and(predicate.toArray(new Predicate[0]));
        });
    }

    /**
     * 필터링 테스트.
     *
     * @param searchKeyword Map
     * @param root          Root of Sales
     * @param builder       CriteriaBuilder
     * @return List of Predicate
     */
    private static List<Predicate> getPredicateWithKeyword(Map<SearchKey, Object> searchKeyword,
                                                           Root<Sales> root,
                                                           CriteriaBuilder builder) {
        List<Predicate> predicate = new ArrayList<>();
        //판매 중인 것과 판매중지가 되어 있지 않은 것들만 조회
        predicate.add(builder.equal(root.get("enabled"), true));
        predicate.add(builder.equal(root.get("soldOut"), false));
        //나머지 조회 조건
        StringBuilder stringBuilder;
        for (SearchKey key : searchKeyword.keySet()) {
            switch (key) {
                case ARTIST:
                    stringBuilder = getStringBuilder(searchKeyword, key);
                    predicate.add(builder.like(
                            root.get("nft").get("artist").get(key.value),
                            stringBuilder.toString()
                    ));
                    break;
                case NAME:
                    stringBuilder = getStringBuilder(searchKeyword, key);
                    predicate.add(builder.like(
                            root.get("nft").get(key.value),
                            stringBuilder.toString()
                    ));
                    break;
                case FILE_TYPE:
                    predicate.add(builder.equal(
                            root.get("nft").get(key.value), searchKeyword.get(key)
                    ));
                    break;
                case WISH_COUNT_GREATER:
                    predicate.add(builder.greaterThan(
                            root.get("nft").get(key.value),
                            Integer.valueOf(searchKeyword.get(key).toString())
                    ));
                    break;
                case PRICE_BETWEEN:
                    String[] valueStrings = searchKeyword.get(key).toString().split(",");
                    predicate.add(builder.between(
                            root.get(key.value), Integer.valueOf(valueStrings[0]),
                            Integer.valueOf(valueStrings[1])));
                    break;
                case SELLER_ID:
                    predicate.add(builder.equal(
                            root.get("seller").get(key.value),
                            Integer.valueOf(searchKeyword.get(key).toString())
                    ));
                    break;
                default:
                    break;
            }
        }
        return predicate;
    }

    private static StringBuilder getStringBuilder(Map<SearchKey, Object> searchKeyword,
                                                  SearchKey key) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder
                .append("%")
                .append(searchKeyword.get(key).toString())
                .append("%");
        return stringBuilder;
    }
}
