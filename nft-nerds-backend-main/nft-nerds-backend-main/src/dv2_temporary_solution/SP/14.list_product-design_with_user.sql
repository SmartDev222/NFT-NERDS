CREATE PROCEDURE `list_product_design_with_user`(IN startFrom INT, IN numberOfRows INT)
BEGIN
	SELECT developer_product_design.*, user_list_v4.email, user_list_v4.full_name FROM 
    developer_product_design LEFT JOIN user_list_v4 ON user_list_v4.id = developer_product_design.developer_id
    ORDER BY developer_product_design.updated_date DESC
    LIMIT startFrom, numberOfRows;
    
    SELECT COUNT(*) AS total FROM developer_product_design;
END