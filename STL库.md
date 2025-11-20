C++算法库，有常用的数据结构集合容器。
```
#include <iostream>
#include <vector> // 提供动态数组（std::vector）
#include <map> // 提供键值对容器（std::map 键自动排序 和 std::unordered_map 无序）的实现。
#include <set> //提供集合容器（std::set和std::unordered_set）的实现。
#include <algorithm> //提供各种通用算法。排序（std::sort）。查找（std::find）。变换（std::transform）。累加（std::accumulate）。
#include <numeric>  // 提供数值算法。如用于 std::accumulate  计算累加和。
#include <functional>  // 用于 std::function 和 std::bind 提供函数对象和绑定器。主要功能：Lambda表达式支持。

// 1. 使用 std::vector 动态数组
void demoVector() {
    std::vector<int> vec = { 1, 2, 3, 4, 5 };
    std::cout << "vector 中的元素：";
    for (int num : vec) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

// 2. 使用 std::map
void demoMap() {
    std::map<std::string, int> ageMap;
    ageMap["Alice"] = 25;
    ageMap["Bob"] = 30;
    ageMap["Charlie"] = 35;

    std::cout << "map 中的元素：";
    for (const auto& pair : ageMap) {
        std::cout << pair.first << " -> " << pair.second << "; ";
    }
    std::cout << std::endl;
}

// 3. 使用 std::set
void demoSet() {
    std::set<int> mySet = { 1, 2, 3, 4, 5, 5 };  // 重复元素会被自动去除
    std::cout << "set 中的元素：";
    for (int num : mySet) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

// 4. 使用 STL 算法对 vector 进行排序
void demoSort() {
    std::vector<int> numbers = { 5, 2, 9, 1, 5, 6 };
    std::sort(numbers.begin(), numbers.end());
    std::cout << "排序后的 numbers：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

// 5. 使用 STL 算法查找元素
void demoFind() {
    std::vector<int> numbers = { 5, 2, 9, 1, 5, 6 };
    int target = 9;
    auto it = std::find(numbers.begin(), numbers.end(), target);
    if (it != numbers.end()) {
        std::cout << "找到 " << target << "，位置为 " << std::distance(numbers.begin(), it) << std::endl;
    }
    else {
        std::cout << target << " 未找到！" << std::endl;
    }
}

// 6. 使用 STL 算法计算总和
void demoAccumulate() {
    std::vector<int> numbers = { 5, 2, 9, 1, 5, 6 };
    int sum = std::accumulate(numbers.begin(), numbers.end(), 0);
    std::cout << "numbers 的总和：" << sum << std::endl;
}

// 7. 使用 STL 算法进行自定义排序（降序）
void demoCustomSort() {
    std::vector<int> numbers = { 5, 2, 9, 1, 5, 6 };
    std::sort(numbers.begin(), numbers.end(), std::greater<int>());
    std::cout << "降序排列后的 numbers：";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

// 8. 使用 STL 算法对每个元素进行转换（加1）
void demoTransform() {
    std::vector<int> numbers = { 5, 2, 9, 1, 5, 6 };
    std::vector<int> incremented(numbers.size());
    std::transform(numbers.begin(), numbers.end(), incremented.begin(), [](int x) { return x + 1; });
    std::cout << "每个元素加1后的结果：";
    for (int num : incremented) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

// 9. 使用 Lambda 表达式计算每个元素的平方
void demoLambda() {
    std::vector<int> numbers = { 5, 2, 9, 1, 5, 6 };
    std::vector<int> squares(numbers.size());
    std::transform(numbers.begin(), numbers.end(), squares.begin(), [](int x) { return x * x; });
    std::cout << "每个元素的平方：";
    for (int num : squares) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

int main() {
    // 调用每个示例函数
    std::cout << "1. 使用 std::vector 动态数组示例：" << std::endl;
    demoVector();
    std::cout << std::endl;

    std::cout << "2. 使用 std::map 示例：" << std::endl;
    demoMap();
    std::cout << std::endl;

    std::cout << "3. 使用 std::set 示例：" << std::endl;
    demoSet();
    std::cout << std::endl;

    std::cout << "4. 使用 STL 算法对 vector 进行排序：" << std::endl;
    demoSort();
    std::cout << std::endl;

    std::cout << "5. 使用 STL 算法查找元素：" << std::endl;
    demoFind();
    std::cout << std::endl;

    std::cout << "6. 使用 STL 算法计算总和：" << std::endl;
    demoAccumulate();
    std::cout << std::endl;

    std::cout << "7. 使用 STL 算法进行自定义排序（降序）：" << std::endl;
    demoCustomSort();
    std::cout << std::endl;

    std::cout << "8. 使用 STL 算法对每个元素进行转换（加1）：" << std::endl;
    demoTransform();
    std::cout << std::endl;

    std::cout << "9. 使用 Lambda 表达式计算每个元素的平方：" << std::endl;
    demoLambda();
    std::cout << std::endl;

    return 0;
}
```