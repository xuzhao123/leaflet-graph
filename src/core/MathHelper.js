let MathHelper = {

    /**
     * 点类
     * @param x
     * @param y
     * @constructor
     */
    Point: function (x, y) {
        this.x = x;
        this.y = y;
    },

    /**
     * 获取两点间距离
     * @param p1
     * @param p2
     * @returns {number}
     */
    getDistance: function (p1, p2) {
        return Math.sqrt((p2.y - p1.y) * (p2.y - p1.y) + (p2.x - p1.x) * (p2.x - p1.x));
    },

    /**
     * 获取斜率
     * @param p1
     * @param p2
     * @returns {number}
     */
    getSlope: function (p1, p2) {
        if ((p2.x - p1.x) == 0) {
            return 0;
        }
        return (p2.y - p1.y) / (p2.x - p1.x)
    },

    /**
     * 获取中心点坐标
     * @param p1
     * @param p2
     * @returns {MathHelper.Point}
     */
    getCenterPoint: function (p1, p2) {
        return new MathHelper.Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    },

    /**
     * 根据两点坐标和切线夹角，获取圆心坐标
     * @param p1
     * @param p2
     * @param angle
     * @returns {MathHelper.Point}
     */
    getCircleCenterPoint: function (p1, p2, angle) {
        let k = MathHelper.getSlope(p1, p2);
        let distance = MathHelper.getDistance(p1, p2);
        let midPoint = MathHelper.getCenterPoint(p1, p2);
        let offset = (distance / 2) / Math.tan(angle * Math.PI / 180);

        //平行于x轴
        if (p1.y - p2.y == 0) {
            return new MathHelper.Point(midPoint.x, midPoint.y - offset);
        }
        //平行于y轴
        if (p1.x - p2.x == 0) {
            return new MathHelper.Point(midPoint.x + offset, midPoint.y);
        }
        let sqrt = Math.sqrt(1 + k * k);
        let centerX = midPoint.x - k * offset / sqrt;
        let centerY = midPoint.y + offset / sqrt;
        return new MathHelper.Point(centerX, centerY);
    },

    /**
     * 根据比例获取两点间的一点
     * @param p1
     * @param p2
     * @param per
     * @returns {MathHelper.Point}
     */
    getPointWithPer: function (p1, p2, per) {
        let x = p1.x + per * (p2.x - p1.x);
        let y = p1.y + per * (p2.y - p1.y);

        return new MathHelper.Point(x, y);
    },

    /**
     * 计算两个向量间的夹角
     * @param x1
     * @param y1
     * @returns {number}
     */
    getAngleWithVector: function (x1, y1) {
        return Math.acos(x1 / (Math.sqrt(x1 * x1 + y1 * y1)));
    }
};

export default MathHelper;