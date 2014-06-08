(function() {
    var name_mappings = {
        DEBUG: "info",
        WARNING: "warning",
        ERROR: "danger",
        INFO: "info"
    };

    function parse_line(line) {
        var obj = {};
        var level_end = line.indexOf(":");
        var mod_end = line.indexOf(": ");

        obj.level = name_mappings[line.substring(0, level_end)];
        obj.module = line.substring(level_end + 1, mod_end);
        obj.text = line.substring(mod_end + 2, line.length);

        return obj;
    }


    var app = angular.module("rust-log-viewer", [ ]);

    app.controller("Viewer", ['$scope', function($scope) {
        function search(obj) {
            return obj.module.contains($scope.module_filter) && obj.text.contains($scope.content_filter);
        }

        function refilter() {
            $scope.lines = $scope.raw_lines.filter(search);
        }

        $scope.lines = [];
        $scope.module_filter = "";
        $scope.content_filter = "";

        $scope.$watch('input', function(value) {
            var value = value || "";
            $scope.raw_lines = value.split("\n").map(parse_line).filter(search);
            $scope.lines = $scope.raw_lines;
        });

        $scope.$watch('module_filter', refilter);
        $scope.$watch('content_filter', refilter);
    }]);
})();
