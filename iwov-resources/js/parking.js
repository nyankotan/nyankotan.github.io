HKIA(function() {
    var e = "";
    switch (HKIA.language()) {
        case "zh-CN":
            e = "gb";
            break;
        case "zh-HK":
            e = "chi";
            break;
        default:
            e = "eng"
    }
    $(".specialAnnouncement").hide(), HKIA.API.load("carparkManual", {
        callback: function(a) {
            $("#sp span").text(a.message[e]), a.showMessage && $(".specialAnnouncement").show(), a.enable ? HKIA.API.load("carpark", {
                callback: function(n) {
                    $(".updateInfo span").text(HKIA.dateFormat(new Date(n.lastUpdatedTime), !0));

                    function c(n, c, i) {
                        if (isNaN(i)) {
                            var s = a.codes[i];
                            s && $(n + " ." + c).find("dd").addClass(s.code).css(s.css).text(s[e])
                        } else $(n + " ." + c + " dd").text(i)
                    }! function(e, a, n) {
                        var i = arguments.callee,
                            s = e.shift(),
                            t = a[s.key],
                            o = n[s.key];
                        t && (s.children ? i(s.children, t, o) : $.each(t, function(e, a) {
                            c("#" + s.id, e, "tcss" !== a ? a : o[e])
                        })), e.length > 0 && i(e, a, n)
                    }([{
                        key: "carpark1",
                        id: "cp1"
                    }, {
                        key: "carpark2",
                        id: "cp2"
                    }, {
                        key: "carpark4",
                        children: [{
                            key: "indoor",
                            id: "cp4in"
                        }, {
                            key: "outdoor",
                            id: "cp4out"
                        }]
                    }, {
                        key: "skycity",
                        id: "skycity"
                    }, {
                        key: "taxi",
                        id: "taxi"
                    }, {
                        key: "lgv",
                        id: "lgv"
                    }], a, n)
                },
                config: {
                    error: function() {
                        $("#sp span").html(HKIA.__(HKIA.config("API.ErrorMessage"))), $(".specialAnnouncement").show()
                    }
                }
            }) : $(".parkingContainer").hide()
        },
        config: {
            error: function() {
                $("#sp span").html(HKIA.__(HKIA.config("API.ErrorMessage"))), $(".specialAnnouncement").show()
            }
        }
    })
});
//# sourceMappingURL=parking.js.map
